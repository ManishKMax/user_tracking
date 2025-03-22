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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCheckHistory = void 0;
const typeorm_1 = require("typeorm");
const user_tracking_entity_1 = require("./user-tracking.entity");
let UserCheckHistory = class UserCheckHistory {
    id;
    checkin_time;
    checkout_time;
    break_start;
    resume_at;
    break_time;
    break_resume_time;
    user_agent;
    userTracking;
    user_tracking_id;
};
exports.UserCheckHistory = UserCheckHistory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserCheckHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp'),
    __metadata("design:type", Date)
], UserCheckHistory.prototype, "checkin_time", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp', { nullable: true }),
    __metadata("design:type", Date)
], UserCheckHistory.prototype, "checkout_time", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp', { nullable: true }),
    __metadata("design:type", Date)
], UserCheckHistory.prototype, "break_start", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp', { nullable: true }),
    __metadata("design:type", Date)
], UserCheckHistory.prototype, "resume_at", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], UserCheckHistory.prototype, "break_time", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], UserCheckHistory.prototype, "break_resume_time", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], UserCheckHistory.prototype, "user_agent", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_tracking_entity_1.UserTracking, (userTracking) => userTracking.userCheckHistories),
    (0, typeorm_1.JoinColumn)({ name: 'user_tracking_id' }),
    __metadata("design:type", user_tracking_entity_1.UserTracking)
], UserCheckHistory.prototype, "userTracking", void 0);
__decorate([
    (0, typeorm_1.Column)('bigint'),
    __metadata("design:type", Number)
], UserCheckHistory.prototype, "user_tracking_id", void 0);
exports.UserCheckHistory = UserCheckHistory = __decorate([
    (0, typeorm_1.Entity)('user_check_history')
], UserCheckHistory);
//# sourceMappingURL=user-check-history.entity.js.map