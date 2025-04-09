import * as Joi from 'joi';
export interface DatabaseConfig {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}
declare const _default: () => {
    database: DatabaseConfig;
};
export default _default;
export declare const configurationValidationSchema: Joi.ObjectSchema<any>;
