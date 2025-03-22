import { HttpException } from '@nestjs/common';
export declare class UserTrackingException extends HttpException {
    constructor(message: string);
}
