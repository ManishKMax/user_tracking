"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTrackController = void 0;
const common_1 = require("@nestjs/common");
const user_track_service_1 = require("./user_track.service");
let UserTrackController = class UserTrackController {
    trackingService;
    constructor(trackingService) {
        this.trackingService = trackingService;
    }
    createTrackingEvent(eventData, userId, userAgent, projectId) {
        if (!userId || !userAgent || !projectId) {
            throw new common_1.BadRequestException('Headers cannot have null values');
        }
        return this.trackingService.createTrackingEvent(eventData, userId, userAgent, projectId);
    }
};
exports.UserTrackController = UserTrackController;
__decorate([
    (0, common_1.Post)('event'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('user_id')),
    __param(2, (0, common_1.Headers)('user_agent')),
    __param(3, (0, common_1.Headers)('project_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", void 0)
], UserTrackController.prototype, "createTrackingEvent", null);
exports.UserTrackController = UserTrackController = __decorate([
    (0, common_1.Controller)('user-track'),
    __metadata("design:paramtypes", [user_track_service_1.TrackingService])
], UserTrackController);
//# sourceMappingURL=user_track.controller.js.map