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
exports.LocationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const location_tracking_entity_1 = require("./entity/location-tracking.entity");
let LocationService = class LocationService {
    locationRepository;
    constructor(locationRepository) {
        this.locationRepository = locationRepository;
    }
    async getLocationByDate(userId, selectedDate) {
        return this.locationRepository
            .createQueryBuilder('location')
            .where('location.userId = :userId', { userId })
            .andWhere('CAST(location.created AS DATE) = :selectedDate', { selectedDate })
            .getMany();
    }
    async addLocation(userTrackingId, lat, long, userAgent, projectId, userId) {
        const location = this.locationRepository.create({
            userTrackingId,
            lat,
            long,
            created: new Date(),
            userAgent,
            projectId,
            userId,
        });
        return await this.locationRepository.save(location);
    }
};
exports.LocationService = LocationService;
exports.LocationService = LocationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(location_tracking_entity_1.LocationTracking)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LocationService);
//# sourceMappingURL=location.service.js.map