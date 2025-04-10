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
exports.SummarySchedulerService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tracking_event_1 = require("./entities/tracking-event/tracking-event");
const user_tracking_summary_1 = require("./entities/user-tracking-summary/user-tracking-summary");
const event_type_enum_1 = require("./event-type.enum");
const typeorm_3 = require("typeorm");
let SummarySchedulerService = class SummarySchedulerService {
    trackingEventRepository;
    summaryRepository;
    constructor(trackingEventRepository, summaryRepository) {
        this.trackingEventRepository = trackingEventRepository;
        this.summaryRepository = summaryRepository;
    }
    async handleCron() {
        console.log('⏰ Running summary generation job...');
        const now = new Date();
        const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
        const events = await this.trackingEventRepository.find({
            where: {
                timestamp: (0, typeorm_3.Between)(oneHourAgo, now),
            },
            order: { timestamp: 'ASC' },
        });
        const groupedByUserAndDate = new Map();
        for (const event of events) {
            const dateKey = event.timestamp.toISOString().split('T')[0];
            const key = `${event.user_id}_${dateKey}`;
            if (!groupedByUserAndDate.has(key)) {
                groupedByUserAndDate.set(key, []);
            }
            groupedByUserAndDate.get(key).push(event);
        }
        for (const [key, userEvents] of groupedByUserAndDate.entries()) {
            const [user_id, date] = key.split('_');
            let summary = await this.summaryRepository.findOne({
                where: { user_id, date },
            });
            if (!summary) {
                summary = this.summaryRepository.create({
                    user_id,
                    project_id: userEvents[0].project_id,
                    user_agent: userEvents[0].user_agent,
                    date,
                    created: userEvents[0].timestamp,
                    checkin_checkout_time: [],
                    break_resume_time: [],
                    totalbreak: 0,
                });
            }
            for (const event of userEvents) {
                switch (event.event_type) {
                    case event_type_enum_1.EventType.CheckIn:
                        summary.checkin = event.timestamp;
                        summary.checkin_checkout_time.push({
                            checkin: event.timestamp.toISOString(),
                            checkout: null,
                        });
                        break;
                    case event_type_enum_1.EventType.CheckOut:
                        summary.checkout = event.timestamp;
                        const lastCheck = summary.checkin_checkout_time.find(c => c.checkout === null);
                        if (lastCheck) {
                            lastCheck.checkout = event.timestamp.toISOString();
                            const duration = new Date(lastCheck.checkout).getTime() - new Date(lastCheck.checkin).getTime();
                            summary.total_hours_worked = (duration) / (1000 * 60);
                            summary.totalbreak += duration / (1000 * 60);
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
                            const duration = new Date(lastBreak.end).getTime() - new Date(lastBreak.start).getTime();
                            summary.totalbreak += duration / (1000 * 60);
                        }
                        break;
                }
            }
            await this.summaryRepository.save(summary);
        }
        console.log('✅ Summary update complete');
    }
};
exports.SummarySchedulerService = SummarySchedulerService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_HOUR),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SummarySchedulerService.prototype, "handleCron", null);
exports.SummarySchedulerService = SummarySchedulerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tracking_event_1.TrackingEvent)),
    __param(1, (0, typeorm_1.InjectRepository)(user_tracking_summary_1.UserTrackingSummary)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SummarySchedulerService);
//# sourceMappingURL=summary-scheduler.service.ts.service.js.map