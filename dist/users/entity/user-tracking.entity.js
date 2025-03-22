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
exports.UserTracking = void 0;
const typeorm_1 = require("typeorm");
const user_check_history_entity_1 = require("./user-check-history.entity");
let UserTracking = class UserTracking {
    id;
    checkin_time;
    checkout_time;
    user_agent;
    created;
    break_time;
    break_resume_time;
    userCheckHistories;
};
exports.UserTracking = UserTracking;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserTracking.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp'),
    __metadata("design:type", String)
], UserTracking.prototype, "checkin_time", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp', { nullable: true }),
    __metadata("design:type", String)
], UserTracking.prototype, "checkout_time", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], UserTracking.prototype, "user_agent", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp', { default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], UserTracking.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], UserTracking.prototype, "break_time", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], UserTracking.prototype, "break_resume_time", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_check_history_entity_1.UserCheckHistory, (userCheckHistory) => userCheckHistory.userTracking),
    __metadata("design:type", Array)
], UserTracking.prototype, "userCheckHistories", void 0);
exports.UserTracking = UserTracking = __decorate([
    (0, typeorm_1.Entity)('user_tracking')
], UserTracking);
//# sourceMappingURL=user-tracking.entity.js.map