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
exports.CallTrackingController = void 0;
const common_1 = require("@nestjs/common");
const call_tracking_service_1 = require("./call-tracking.service");
const create_call_tracking_dto_1 = require("./dto/create-call-tracking.dto");
const find_call_tracking_dto_1 = require("./dto/find-call-tracking.dto");
let CallTrackingController = class CallTrackingController {
    callTrackingService;
    constructor(callTrackingService) {
        this.callTrackingService = callTrackingService;
    }
    create(user_id, project_id, user_agent, body) {
        const data = {
            ...body,
            user_id,
            project_id,
            user_agent,
        };
        return this.callTrackingService.create(data);
    }
    findAll(user_id, project_id, dateRangeDto) {
        const { from_date, to_date } = dateRangeDto;
        return this.callTrackingService.findAll(user_id, project_id, from_date, to_date);
    }
    findOne(user_id, project_id, id) {
        return this.callTrackingService.findOne(id, user_id, project_id);
    }
    remove(user_id, project_id, id) {
        return this.callTrackingService.remove(id, user_id, project_id);
    }
};
exports.CallTrackingController = CallTrackingController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Headers)('user_id')),
    __param(1, (0, common_1.Headers)('project_id')),
    __param(2, (0, common_1.Headers)('user_agent')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, create_call_tracking_dto_1.CreateCallTrackingDto]),
    __metadata("design:returntype", void 0)
], CallTrackingController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('find'),
    __param(0, (0, common_1.Headers)('user_id')),
    __param(1, (0, common_1.Headers)('project_id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, find_call_tracking_dto_1.FindCallTrackingDto]),
    __metadata("design:returntype", void 0)
], CallTrackingController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('find-one'),
    __param(0, (0, common_1.Headers)('user_id')),
    __param(1, (0, common_1.Headers)('project_id')),
    __param(2, (0, common_1.Body)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number]),
    __metadata("design:returntype", void 0)
], CallTrackingController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Headers)('user_id')),
    __param(1, (0, common_1.Headers)('project_id')),
    __param(2, (0, common_1.Body)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number]),
    __metadata("design:returntype", void 0)
], CallTrackingController.prototype, "remove", null);
exports.CallTrackingController = CallTrackingController = __decorate([
    (0, common_1.Controller)('call-tracking'),
    __metadata("design:paramtypes", [call_tracking_service_1.CallTrackingService])
], CallTrackingController);
//# sourceMappingURL=call-tracking.controller.js.map