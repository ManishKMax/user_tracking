export declare class LoggingService {
    private readonly logger;
    info(message: string): void;
    warn(message: string): void;
    error(message: string, trace?: string): void;
    debug(message: string): void;
    verbose(message: string): void;
}
