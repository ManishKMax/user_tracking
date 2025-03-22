import * as Joi from 'joi';

export interface DatabaseConfig {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

// Configuration function
export default (): { database: DatabaseConfig } => ({
  database: {
    type: process.env.DATABASE_TYPE || 'mysql',  // Fallback to 'mysql' if not provided
    host: process.env.DATABASE_HOST || 'localhost',  // Fallback to 'localhost'
    port: parseInt(process.env.DATABASE_PORT || '3306', 10),  // Default to 3306 if not provided
    username: process.env.DATABASE_USERNAME || 'root',  // Fallback to 'root'
    password: process.env.DATABASE_PASSWORD || '',  // Fallback to empty string
    database: process.env.DATABASE_NAME || 'tracking',  // Fallback to 'tracking'
  },
});

// Validation schema for environment variables
export const configurationValidationSchema = Joi.object({
  DATABASE_TYPE: Joi.string().valid('mysql', 'postgres').required(),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().default(3306),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
});
