import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    // Check for custom exception messages or fallback to default message
    const message = exception.message || 'An unexpected error occurred';
    
    // Customize the error response dynamically
    response.status(status).json({
      statusCode: status,
      message: message,  // Can include dynamic error message
      error: exception.name || 'Internal Server Error',  // Default or exception name as error type
    });
  }
}
