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
exports.LocationController = void 0;
const common_1 = require("@nestjs/common");
const location_service_1 = require("./location.service");
let LocationController = class LocationController {
    locationService;
    constructor(locationService) {
        this.locationService = locationService;
    }
    async getLocationByDate(userId, selectedDate) {
        return this.locationService.getLocationByDate(userId, selectedDate);
    }
    async addLocation(userTrackingId, lat, long, userAgent, projectId, userId) {
        return this.locationService.addLocation(userTrackingId, lat, long, userAgent, projectId, userId);
    }
};
exports.LocationController = LocationController;
__decorate([
    (0, common_1.Get)('getLocationByDate'),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Query)('selectedDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "getLocationByDate", null);
__decorate([
    (0, common_1.Post)('addLocation'),
    __param(0, (0, common_1.Body)('userTrackingId')),
    __param(1, (0, common_1.Body)('lat')),
    __param(2, (0, common_1.Body)('long')),
    __param(3, (0, common_1.Body)('userAgent')),
    __param(4, (0, common_1.Body)('projectId')),
    __param(5, (0, common_1.Body)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, String, BigInt, Number]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "addLocation", null);
exports.LocationController = LocationController = __decorate([
    (0, common_1.Controller)('location'),
    __metadata("design:paramtypes", [location_service_1.LocationService])
], LocationController);
//# sourceMappingURL=location.controller.js.map