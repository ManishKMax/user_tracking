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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_tracking_entity_1 = require("../entity/user-tracking.entity");
const user_check_history_entity_1 = require("../entity/user-check-history.entity");
let UsersService = class UsersService {
    userTrackingRepository;
    userCheckHistoryRepository;
    constructor(userTrackingRepository, userCheckHistoryRepository) {
        this.userTrackingRepository = userTrackingRepository;
        this.userCheckHistoryRepository = userCheckHistoryRepository;
    }
    async checkInUser(userAgent, checkinTime) {
        const userTracking = this.userTrackingRepository.create({
            checkin_time: checkinTime,
            user_agent: userAgent,
        });
        const savedUserTracking = await this.userTrackingRepository.save(userTracking);
        const userCheckHistory = this.userCheckHistoryRepository.create({
            checkin_time: checkinTime,
            userTracking: savedUserTracking,
            user_tracking_id: savedUserTracking.id,
            user_agent: userAgent,
        });
        await this.userCheckHistoryRepository.save(userCheckHistory);
        return savedUserTracking;
    }
    async checkOutUser(userTrackingId, checkoutTime) {
        const userTracking = await this.userTrackingRepository.findOne({ where: { id: userTrackingId } });
        if (!userTracking) {
            throw new common_1.NotFoundException(`UserTracking with ID ${userTrackingId} not found.`);
        }
        userTracking.checkout_time = checkoutTime;
        await this.userTrackingRepository.save(userTracking);
        const userCheckHistory = await this.userCheckHistoryRepository.findOne({
            where: { user_tracking_id: userTrackingId, checkout_time: (0, typeorm_2.IsNull)() },
        });
        if (userCheckHistory) {
            userCheckHistory.checkout_time = new Date(checkoutTime);
            await this.userCheckHistoryRepository.save(userCheckHistory);
        }
        return userTracking;
    }
    async startBreak(userTrackingId, breakStart) {
        const userTracking = await this.userTrackingRepository.findOne({ where: { id: userTrackingId } });
        if (!userTracking) {
            throw new common_1.NotFoundException(`UserTracking with ID ${userTrackingId} not found.`);
        }
        const userCheckHistory = this.userCheckHistoryRepository.create({
            break_start: breakStart,
            userTracking: userTracking,
            user_tracking_id: userTracking.id,
            user_agent: userTracking.user_agent,
        });
        return await this.userCheckHistoryRepository.save(userCheckHistory);
    }
    async resumeBreak(userTrackingId, resumeAt) {
        const userTracking = await this.userTrackingRepository.findOne({ where: { id: userTrackingId } });
        if (!userTracking) {
            throw new common_1.NotFoundException(`UserTracking with ID ${userTrackingId} not found.`);
        }
        const userCheckHistory = await this.userCheckHistoryRepository.findOne({ where: { user_tracking_id: userTrackingId, break_start: (0, typeorm_2.Not)((0, typeorm_2.IsNull)()) } });
        if (userCheckHistory) {
            userCheckHistory.resume_at = new Date(resumeAt);
            await this.userCheckHistoryRepository.save(userCheckHistory);
        }
        let totalBreakTime = '0';
        const breakEntries = await this.userCheckHistoryRepository.find({ where: { user_tracking_id: userTrackingId, break_start: (0, typeorm_2.Not)((0, typeorm_2.IsNull)()) } });
        totalBreakTime = breakEntries.reduce((total, entry) => {
            return total;
        }, totalBreakTime);
        userTracking.break_time = totalBreakTime;
        userTracking.break_resume_time = resumeAt;
        await this.userTrackingRepository.save(userTracking);
        return userTracking;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_tracking_entity_1.UserTracking)),
    __param(1, (0, typeorm_1.InjectRepository)(user_check_history_entity_1.UserCheckHistory)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map