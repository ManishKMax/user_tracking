import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

@Injectable()
export class ValidateHeadersPipe implements PipeTransform {
  constructor(private readonly dtoClass: any) {}

  transform(value: any, metadata: ArgumentMetadata) {
    try {
      const transformed = plainToInstance(this.dtoClass, value, {
        enableImplicitConversion: false,
      });

      const errors = validateSync(transformed, {
        whitelist: true,
        forbidNonWhitelisted: true,
        skipMissingProperties: false,
      });

      if (errors.length > 0) {
        const formattedErrors = errors.map(err => ({
          field: err.property,
          errors: Object.values(err.constraints || {}),
        }));
        throw new BadRequestException({
          message: 'Header validation failed',
          errors: formattedErrors,
        });
      }

      return transformed;
    } catch (error) {
      // If it's already a BadRequestException, rethrow it
      if (error instanceof BadRequestException) {
        throw error;
      }

      // Log error if needed and throw a general internal server error
      console.error('Unexpected error in ValidateHeadersPipe:', error);
      throw new InternalServerErrorException('An unexpected error occurred during header validation.');
    }
  }
}
