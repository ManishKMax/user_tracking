import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { ELoggingService } from '../logging/e-logging.service';

@Injectable()
export class ValidateHeadersInterceptor implements NestInterceptor {
  constructor(
    private readonly dtoClass: any,
    private readonly logger: ELoggingService,
  ) {}

  // Converts kebab-case headers to snake_case
  private transformHeadersToSnakeCase(headers: Record<string, string>) {
    const transformed: Record<string, string> = {};

    for (const [key, value] of Object.entries(headers)) {
      const snakeKey = key.replace(/-/g, '_'); // e.g., user-agent -> user_agent
      transformed[snakeKey] = value;
    }

    return transformed;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const headers = request.headers;

    // ✅ Skip header validation for specific paths
    const skipPaths = ['/', '/health', '/docs'];
    if (skipPaths.includes(request.path)) {
      return next.handle();
    }

    this.logger.logRequest(request.originalUrl, request.method, headers, null);

    try {
      // Convert incoming headers to expected DTO shape
      const transformedHeaders = this.transformHeadersToSnakeCase(headers);

      const pickedHeaders = {
        user_agent: transformedHeaders['user_agent'],
        user_id: transformedHeaders['user_id'],
        project_id: transformedHeaders['project_id'],
      };

      const transformedDto = plainToInstance(
        this.dtoClass,
        pickedHeaders,
      ) as object;

      const errors = validateSync(transformedDto, {
        whitelist: true,
        forbidNonWhitelisted: true,
        skipMissingProperties: false,
      });

      if (errors.length > 0) {
        const formattedErrors = errors.map((err) => ({
          field: err.property,
          errors: Object.values(err.constraints || {}),
        }));

        this.logger.logError(request.originalUrl, {
          message: 'Header validation failed',
          errors: formattedErrors,
        });

        throw new BadRequestException({
          message: 'Header validation failed',
          errors: formattedErrors,
        });
      }

      // Attach validated headers to request
      request.validatedHeaders = pickedHeaders;

      return next.handle();
    } catch (error) {
      this.logger.logError(request.originalUrl, error);

      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Unexpected error during header validation',
      );
    }
  }
}
