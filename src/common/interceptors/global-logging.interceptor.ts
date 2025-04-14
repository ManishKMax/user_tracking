// src/common/interceptors/global-logging.interceptor.ts

import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable, tap, catchError, throwError } from 'rxjs';
  import { ELoggingService } from '../logging/e-logging.service';
  
  @Injectable()
  export class GlobalLoggingInterceptor implements NestInterceptor {
    constructor(private readonly logger: ELoggingService) {}
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const request = context.switchToHttp().getRequest();
      const { method, originalUrl, headers, body, query } = request;
  
      // Construct full URL with query params
      const queryString = Object.keys(query).length
        ? `?${new URLSearchParams(query).toString()}`
        : '';
      const fullUrl = `${originalUrl}${queryString}`;
  
      const startTime = Date.now();
  
      // 🔍 Log request
      this.logger.logRequest(fullUrl, method, headers, body);
  
      return next.handle().pipe(
        tap((responseData) => {
          const duration = Date.now() - startTime;
          // ✅ Log response
          this.logger.logResponse(fullUrl, {
            responseTime: `${duration}ms`,
            response: responseData,
          });
        }),
        catchError((err) => {
          const duration = Date.now() - startTime;
          // ❌ Log error
          this.logger.logError(fullUrl, {
            message: err.message,
            stack: err.stack,
            responseTime: `${duration}ms`,
          });
          return throwError(() => err);
        }),
      );
    }
  }
  