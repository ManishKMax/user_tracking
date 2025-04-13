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
exports.CreateCallTrackingDto = void 0;
const class_validator_1 = require("class-validator");
const call_tracking_entity_1 = require("../entities/call-tracking.entity");
class CreateCallTrackingDto {
    call_type;
    recording_url;
    duration;
}
exports.CreateCallTrackingDto = CreateCallTrackingDto;
__decorate([
    (0, class_validator_1.IsEnum)(call_tracking_entity_1.CallType),
    __metadata("design:type", String)
], CreateCallTrackingDto.prototype, "call_type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCallTrackingDto.prototype, "recording_url", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCallTrackingDto.prototype, "duration", void 0);
//# sourceMappingURL=create-call-tracking.dto.js.map