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
exports.TripService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const trip_entity_1 = require("./entities/trip/trip.entity");
const trip_location_entity_1 = require("./entities/trip-location/trip-location.entity");
let TripService = class TripService {
    tripRepo;
    locRepo;
    constructor(tripRepo, locRepo) {
        this.tripRepo = tripRepo;
        this.locRepo = locRepo;
    }
    async startTrip(dto, headers) {
        try {
            const trip = this.tripRepo.create({
                user_id: headers.user_id,
                project_id: headers.project_id,
                user_agent: headers.user_agent,
                startDateTime: dto.startDateTime,
                startlocation: dto.startLocation,
                reason: dto.reason,
                created: new Date(),
            });
            const savedTrip = await this.tripRepo.save(trip);
            await this.locRepo.save({
                tripid: savedTrip.id,
                latitude: dto.latitude,
                longitude: dto.longitude,
                distance: '0',
                created: new Date(),
            });
            return {
                trip: {
                    startDateTime: savedTrip.startDateTime,
                    startlocation: savedTrip.startlocation,
                    reason: savedTrip.reason,
                    locations: [
                        {
                            latitude: dto.latitude,
                            longitude: dto.longitude,
                            distance: '0',
                        },
                    ],
                },
            };
        }
        catch (error) {
            throw new Error(`Failed to start trip: ${error.message}`);
        }
    }
    async endTrip(id, dto) {
        try {
            const trip = await this.tripRepo.findOne({ where: { id } });
            if (!trip)
                throw new common_1.NotFoundException('Trip not found');
            const lastLoc = await this.locRepo.findOne({
                where: { tripid: id },
                order: { created: 'DESC' },
            });
            if (!lastLoc)
                throw new common_1.NotFoundException('No locations found for this trip');
            const distance = this.calculateDistance(+lastLoc.latitude, +lastLoc.longitude, +dto.latitude, +dto.longitude);
            trip.endDateTime = dto.endDateTime;
            trip.endlocation = dto.endLocation;
            trip.total_distance = this.updateTotalDistance(trip.total_distance, distance);
            await this.tripRepo.save(trip);
            await this.locRepo.save({
                tripid: id,
                latitude: dto.latitude,
                longitude: dto.longitude,
                distance: distance.toFixed(2),
                created: new Date(),
            });
            return {
                trip: {
                    startDateTime: trip.startDateTime,
                    endDateTime: trip.endDateTime,
                    startlocation: trip.startlocation,
                    endlocation: trip.endlocation,
                    total_distance: trip.total_distance,
                    locations: [
                        {
                            latitude: dto.latitude,
                            longitude: dto.longitude,
                            distance: distance.toFixed(2),
                        },
                    ],
                },
            };
        }
        catch (error) {
            throw new Error(`Failed to end trip: ${error.message}`);
        }
    }
    async addLocation(dto) {
        try {
            const lastLoc = await this.locRepo.findOne({
                where: { tripid: dto.tripId },
                order: { created: 'DESC' },
            });
            if (!lastLoc)
                throw new common_1.NotFoundException('No locations found for this trip');
            const distance = this.calculateDistance(+lastLoc.latitude, +lastLoc.longitude, +dto.latitude, +dto.longitude);
            await this.locRepo.save({
                tripid: dto.tripId,
                latitude: dto.latitude,
                longitude: dto.longitude,
                distance: distance.toFixed(2),
                created: new Date(),
            });
            const trip = await this.tripRepo.findOne({ where: { id: dto.tripId } });
            if (trip) {
                trip.total_distance = this.updateTotalDistance(trip.total_distance, distance);
                await this.tripRepo.save(trip);
            }
            else {
                throw new common_1.NotFoundException('Trip not found');
            }
            return {
                locations: [
                    {
                        latitude: dto.latitude,
                        longitude: dto.longitude,
                        distance: distance.toFixed(2),
                    },
                ],
            };
        }
        catch (error) {
            throw new Error(`Failed to add location: ${error.message}`);
        }
    }
    async getTripLocationsByDate(dto) {
        try {
            const { user_id, project_id, date } = dto;
            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);
            const trip = await this.tripRepo.findOne({
                where: {
                    user_id,
                    project_id,
                    startDateTime: (0, typeorm_2.Between)(startOfDay, endOfDay),
                },
            });
            if (!trip) {
                throw new common_1.NotFoundException('No trip found for the given user, project, and date');
            }
            const locations = await this.locRepo.find({
                where: { tripid: trip.id },
                order: { created: 'ASC' },
            });
            return {
                trip: {
                    startDateTime: trip.startDateTime,
                    endDateTime: trip.endDateTime,
                    startlocation: trip.startlocation,
                    endlocation: trip.endlocation,
                    total_distance: trip.total_distance,
                    locations: locations.map(loc => ({
                        latitude: loc.latitude,
                        longitude: loc.longitude,
                        distance: loc.distance,
                    })),
                },
            };
        }
        catch (error) {
            throw new common_1.NotFoundException(error.message);
        }
    }
    calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371;
        const toRad = (v) => (v * Math.PI) / 180;
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(lat1)) *
                Math.cos(toRad(lat2)) *
                Math.sin(dLon / 2) ** 2;
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }
    updateTotalDistance(current, added) {
        const curr = parseFloat(current || '0');
        return (curr + added).toFixed(2);
    }
};
exports.TripService = TripService;
exports.TripService = TripService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(trip_entity_1.Trip)),
    __param(1, (0, typeorm_1.InjectRepository)(trip_location_entity_1.TripLocation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TripService);
//# sourceMappingURL=trip.service.js.map