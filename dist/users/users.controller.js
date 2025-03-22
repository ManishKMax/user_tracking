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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./provider/users.service");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    async checkInUser(userAgent, checkinTime) {
        return this.usersService.checkInUser(userAgent, checkinTime);
    }
    async checkOutUser(userTrackingId, checkoutTime) {
        return this.usersService.checkOutUser(userTrackingId, checkoutTime);
    }
    async startBreak(userTrackingId, breakStart) {
        return this.usersService.startBreak(userTrackingId, breakStart);
    }
    async resumeBreak(userTrackingId, resumeAt) {
        return this.usersService.resumeBreak(userTrackingId, resumeAt);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)('checkin'),
    __param(0, (0, common_1.Body)('userAgent')),
    __param(1, (0, common_1.Body)('checkinTime')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "checkInUser", null);
__decorate([
    (0, common_1.Post)('checkout/:userTrackingId'),
    __param(0, (0, common_1.Param)('userTrackingId')),
    __param(1, (0, common_1.Body)('checkoutTime')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "checkOutUser", null);
__decorate([
    (0, common_1.Post)('break/start/:userTrackingId'),
    __param(0, (0, common_1.Param)('userTrackingId')),
    __param(1, (0, common_1.Body)('breakStart')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "startBreak", null);
__decorate([
    (0, common_1.Post)('break/resume/:userTrackingId'),
    __param(0, (0, common_1.Param)('userTrackingId')),
    __param(1, (0, common_1.Body)('resumeAt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "resumeBreak", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map