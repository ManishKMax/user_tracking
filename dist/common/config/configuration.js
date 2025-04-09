"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurationValidationSchema = void 0;
const Joi = require("joi");
exports.default = () => ({
    database: {
        type: process.env.DATABASE_TYPE || 'mysql',
        host: process.env.DATABASE_HOST || 'localhost',
        port: parseInt(process.env.DATABASE_PORT || '3306', 10),
        username: process.env.DATABASE_USERNAME || 'root',
        password: process.env.DATABASE_PASSWORD || '',
        database: process.env.DATABASE_NAME || 'tracking',
    },
});
exports.configurationValidationSchema = Joi.object({
    DATABASE_TYPE: Joi.string().valid('mysql', 'postgres').required(),
    DATABASE_HOST: Joi.string().required(),
    DATABASE_PORT: Joi.number().default(3306),
    DATABASE_USERNAME: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
    DATABASE_NAME: Joi.string().required(),
});
//# sourceMappingURL=configuration.js.map