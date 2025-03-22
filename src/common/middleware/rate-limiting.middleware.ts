// // src/common/middleware/rate-limiting.middleware.ts
// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import { RateLimiterMemory } from 'rate-limiter-flexible'; // Using memory store for simplicity
// import { HttpException, HttpStatus } from '@nestjs/common';

// @Injectable()
// export class RateLimitingMiddleware implements NestMiddleware {
//   private rateLimiter: RateLimiterMemory;

//   constructor() {
//     // Set up rate limiter: Max 5 requests per 1 minute per IP
//     this.rateLimiter = new RateLimiterMemory({
//       points: 5, // Max points
//       duration: 60, // Per 60 seconds
//     });
//   }

//   async use(req: Request, res: Response, next: NextFunction) {
//     try {
//       // Use the client's IP as the key to track the rate limit
//       const clientIP = req.ip;

//       // Consume 1 point for each request from this IP
//       await this.rateLimiter.consume(clientIP);

//       // Continue to the next middleware/controller
//       next();
//     } catch (rejRes) {
//       // If rate limit is exceeded, return a 429 Too Many Requests error
//       throw new HttpException(
//         'Too many requests. Please try again later.',
//         HttpStatus.TOO_MANY_REQUESTS,
//       );
//     }
//   }
// }
