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
exports.TrackingEvent = void 0;
const event_type_enum_1 = require("../../event-type.enum");
const typeorm_1 = require("typeorm");
let TrackingEvent = class TrackingEvent {
    id;
    user_id;
    timestamp;
    event_type;
    created;
    user_agent;
    project_id;
};
exports.TrackingEvent = TrackingEvent;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TrackingEvent.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TrackingEvent.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], TrackingEvent.prototype, "timestamp", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: event_type_enum_1.EventType,
    }),
    __metadata("design:type", String)
], TrackingEvent.prototype, "event_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], TrackingEvent.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TrackingEvent.prototype, "user_agent", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TrackingEvent.prototype, "project_id", void 0);
exports.TrackingEvent = TrackingEvent = __decorate([
    (0, typeorm_1.Entity)('tracking_event')
], TrackingEvent);
//# sourceMappingURL=tracking-event.js.map