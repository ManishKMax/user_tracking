"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = exports.configurationValidationSchema = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const Joi = require("joi");
const configuration_1 = require("./common/config/configuration");
const tracking_event_1 = require("./user_track/entities/tracking-event/tracking-event");
const user_tracking_summary_1 = require("./user_track/entities/user-tracking-summary/user-tracking-summary");
const user_track_module_1 = require("./user_track/user_track.module");
exports.configurationValidationSchema = Joi.object({
    DATABASE_TYPE: Joi.string().valid('mysql', 'postgres').required(),
    DATABASE_HOST: Joi.string().required(),
    DATABASE_PORT: Joi.number().default(3306),
    DATABASE_USERNAME: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
    DATABASE_NAME: Joi.string().required(),
});
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [configuration_1.default],
                validationSchema: exports.configurationValidationSchema,
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => {
                    try {
                        const dbConfig = {
                            type: configService.get('database.type'),
                            host: configService.get('database.host'),
                            port: configService.get('database.port'),
                            username: configService.get('database.username'),
                            password: configService.get('database.password'),
                            database: configService.get('database.database'),
                            entities: [tracking_event_1.TrackingEvent, user_tracking_summary_1.UserTrackingSummary],
                            synchronize: true,
                        };
                        if (!dbConfig.host || !dbConfig.username || !dbConfig.password || !dbConfig.database) {
                            throw new Error('Missing required database configuration');
                        }
                        return dbConfig;
                    }
                    catch (error) {
                        console.error('Error while loading database configuration:', error.message);
                        process.exit(1);
                    }
                },
                inject: [config_1.ConfigService],
            }),
            user_track_module_1.TrackingModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map