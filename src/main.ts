import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';  // Import the main AppModule
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ValidateHeadersInterceptor } from './common/interceptors/validate-headers.interceptor';
import { CommonHeaderDto } from './common/dto/common-headers.dto';
import { GlobalLoggingInterceptor } from './common/interceptors/global-logging.interceptor';
import { ELoggingService } from './common/logging/e-logging.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);  // Create the application with AppModule

  // Create logger instance
  const logger = new ELoggingService();

  // Configure global middlewares, pipes, filters, etc.
  app.useGlobalPipes(new ValidationPipe());  // Use validation pipe globally
  app.useGlobalFilters(new HttpExceptionFilter());  // Use custom exception filter

  // Global logger
  app.useGlobalInterceptors(new GlobalLoggingInterceptor(logger));

  // Apply header validation globally
  app.useGlobalInterceptors(new ValidateHeadersInterceptor(CommonHeaderDto,logger));

  app.useGlobalInterceptors(new LoggingInterceptor());  // Use custom logging interceptor
  app.enableCors();  // Enable CORS globally (you can configure it more specifically)

  await app.listen(3000);  // Start the application on port 3000
  Logger.log('Application is running on: http://localhost:3000');
}

bootstrap();
