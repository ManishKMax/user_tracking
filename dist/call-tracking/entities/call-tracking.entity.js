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
exports.CallTracking = exports.CallType = void 0;
const typeorm_1 = require("typeorm");
var CallType;
(function (CallType) {
    CallType["INCOMING"] = "Incoming";
    CallType["OUTGOING"] = "Outgoing";
    CallType["MISSED"] = "Missed";
    CallType["REJECTED"] = "Rejected";
})(CallType || (exports.CallType = CallType = {}));
let CallTracking = class CallTracking {
    id;
    user_id;
    call_type;
    recording_url;
    duration;
    user_agent;
    project_id;
    create_date;
};
exports.CallTracking = CallTracking;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment', { type: 'bigint' }),
    __metadata("design:type", Number)
], CallTracking.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CallTracking.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: CallType,
    }),
    __metadata("design:type", String)
], CallTracking.prototype, "call_type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CallTracking.prototype, "recording_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time' }),
    __metadata("design:type", String)
], CallTracking.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CallTracking.prototype, "user_agent", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CallTracking.prototype, "project_id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CallTracking.prototype, "create_date", void 0);
exports.CallTracking = CallTracking = __decorate([
    (0, typeorm_1.Entity)('call_tracking')
], CallTracking);
//# sourceMappingURL=call-tracking.entity.js.map