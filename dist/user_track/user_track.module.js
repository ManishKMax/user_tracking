"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackingModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const tracking_event_1 = require("./entities/tracking-event/tracking-event");
const user_track_service_1 = require("./user_track.service");
const user_track_controller_1 = require("./user_track.controller");
const summary_scheduler_service_ts_service_1 = require("./summary-scheduler.service.ts.service");
const user_tracking_summary_1 = require("./entities/user-tracking-summary/user-tracking-summary");
let TrackingModule = class TrackingModule {
};
exports.TrackingModule = TrackingModule;
exports.TrackingModule = TrackingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([tracking_event_1.TrackingEvent, user_tracking_summary_1.UserTrackingSummary]),
        ],
        controllers: [user_track_controller_1.UserTrackController],
        providers: [user_track_service_1.TrackingService, summary_scheduler_service_ts_service_1.SummarySchedulerService],
    })
], TrackingModule);
//# sourceMappingURL=user_track.module.js.map