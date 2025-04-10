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
exports.TrackingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tracking_event_1 = require("./entities/tracking-event/tracking-event");
let TrackingService = class TrackingService {
    trackingEventRepository;
    constructor(trackingEventRepository) {
        this.trackingEventRepository = trackingEventRepository;
    }
    async createTrackingEvent(eventData, userId, userAgent, projectId) {
        if (eventData.timestamp) {
            if (typeof eventData.timestamp === 'string') {
                eventData.timestamp = new Date(eventData.timestamp);
            }
            else if (!(eventData.timestamp instanceof Date)) {
                eventData.timestamp = new Date(eventData.timestamp);
            }
        }
        else {
            eventData.timestamp = new Date();
        }
        eventData.user_id = userId;
        eventData.project_id = projectId;
        eventData.user_agent = userAgent;
        eventData.timestamp = new Date(eventData.timestamp);
        const event = await this.trackingEventRepository.save(eventData);
        console.log('✅ Tracking Event Saved:', event);
        return event;
    }
    async getEventsByUserProjectAndDate(userId, projectId, date) {
        const startOfDay = new Date(`${date}T00:00:00Z`);
        const endOfDay = new Date(`${date}T23:59:59Z`);
        return this.trackingEventRepository.find({
            where: {
                user_id: userId,
                project_id: projectId,
                timestamp: (0, typeorm_2.Between)(startOfDay, endOfDay),
            },
            order: { timestamp: 'ASC' },
        });
    }
};
exports.TrackingService = TrackingService;
exports.TrackingService = TrackingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tracking_event_1.TrackingEvent)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TrackingService);
//# sourceMappingURL=user_track.service.js.map