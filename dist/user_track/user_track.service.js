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
const user_tracking_summary_1 = require("./entities/user-tracking-summary/user-tracking-summary");
const event_type_enum_1 = require("./event-type.enum");
let TrackingService = class TrackingService {
    trackingEventRepository;
    trackingSummaryRepository;
    constructor(trackingEventRepository, trackingSummaryRepository) {
        this.trackingEventRepository = trackingEventRepository;
        this.trackingSummaryRepository = trackingSummaryRepository;
    }
    async createTrackingEvent(eventData, userId, userAgent, projectId) {
        console.log('TimeStam11p:', eventData.timestamp);
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
        console.log('Saved Event:', event);
        const date = event.timestamp.toISOString().split('T')[0];
        let summary = await this.trackingSummaryRepository.findOne({
            where: { user_id: userId, date },
        });
        if (!summary) {
            summary = this.trackingSummaryRepository.create({
                user_id: userId,
                project_id: projectId,
                user_agent: userAgent,
                created: event.timestamp,
                date,
                break_resume_time: [],
            });
        }
        console.log('Event Type:', event.event_type);
        switch (event.event_type) {
            case event_type_enum_1.EventType.CheckIn:
                if (summary.checkin_checkout_time && summary.checkin_checkout_time.length > 0) {
                    const lastEntry = summary.checkin_checkout_time[summary.checkin_checkout_time.length - 1];
                    if (lastEntry.checkout === null) {
                        summary.checkin_checkout_time.push({
                            checkin: event.timestamp.toISOString(),
                            checkout: null,
                        });
                    }
                    else {
                        summary.checkin_checkout_time.push({
                            checkin: event.timestamp.toISOString(),
                            checkout: null,
                        });
                    }
                }
                else {
                    summary.checkin_checkout_time = [
                        { checkin: event.timestamp.toISOString(), checkout: null },
                    ];
                }
                summary.checkin = event.timestamp;
                break;
            case event_type_enum_1.EventType.CheckOut:
                summary.checkout = event.timestamp;
                if (summary.checkin && summary.checkout) {
                    const checkin = new Date(summary.checkin).getTime();
                    const checkout = new Date(summary.checkout).getTime();
                    summary.total_hours_worked = (checkout - checkin) / (1000 * 60);
                }
                const lastcheckin = summary.checkin_checkout_time.find(b => b.checkout === null);
                if (lastcheckin) {
                    lastcheckin.checkout = event.timestamp.toISOString();
                    const startTime = new Date(lastcheckin.checkin).getTime();
                    const endTime = new Date(lastcheckin.checkout).getTime();
                    const breakDuration = (endTime - startTime) / (1000 * 60);
                    summary.totalbreak += breakDuration;
                }
                break;
            case event_type_enum_1.EventType.BreakTime:
                summary.break_resume_time.push({
                    start: event.timestamp.toISOString(),
                    end: null,
                });
                break;
            case event_type_enum_1.EventType.ResumeTime:
                const lastBreak = summary.break_resume_time.find(b => b.end === null);
                if (lastBreak) {
                    lastBreak.end = event.timestamp.toISOString();
                    const startTime = new Date(lastBreak.start).getTime();
                    const endTime = new Date(lastBreak.end).getTime();
                    const breakDuration = (endTime - startTime) / (1000 * 60);
                    summary.totalbreak += breakDuration;
                }
                break;
            default:
                console.log('Unhandled event type:', event.event_type);
                break;
        }
        await this.trackingSummaryRepository.save(summary);
        return event;
    }
};
exports.TrackingService = TrackingService;
exports.TrackingService = TrackingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tracking_event_1.TrackingEvent)),
    __param(1, (0, typeorm_1.InjectRepository)(user_tracking_summary_1.UserTrackingSummary)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TrackingService);
//# sourceMappingURL=user_track.service.js.map