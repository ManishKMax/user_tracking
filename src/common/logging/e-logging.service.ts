// src/common/logging/e-logging.service.ts

import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ELoggingService {
  private readonly logger = new Logger('ELogger');

  logRequest(path: string, method: string, headers: any, body: any) {
    this.logger.log(`📥 Request: [${method}] ${path}`);
    this.logger.debug(`Headers: ${JSON.stringify(headers)}`);
    this.logger.debug(`Body: ${JSON.stringify(body)}`);
  }

  logResponse(path: string, data: any) {
    this.logger.log(`📤 Response: ${path}`);
    this.logger.debug(`Response: ${JSON.stringify(data)}`);
  }

  logError(path: string, error: any) {
    this.logger.error(`❌ Error in ${path}`);
    this.logger.error(error.stack || error.message);
  }
}
