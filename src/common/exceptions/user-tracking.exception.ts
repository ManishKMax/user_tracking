// src/common/exceptions/user-tracking.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class UserTrackingException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
