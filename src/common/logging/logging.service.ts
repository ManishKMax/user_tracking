import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggingService {
  private readonly logger = new Logger(LoggingService.name); // Use the service class name for logs

  info(message: string): void {
    this.logger.log(message); // Info level
  }

  warn(message: string): void {
    this.logger.warn(message); // Warning level
  }

  error(message: string, trace?: string): void {
    this.logger.error(message, trace); // Error level with optional trace
  }

  debug(message: string): void {
    this.logger.debug(message); // Debug level
  }

  verbose(message: string): void {
    this.logger.verbose(message); // Verbose level
  }
}
