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
exports.TripController = void 0;
const common_1 = require("@nestjs/common");
const trip_service_1 = require("./trip.service");
const start_trip_dto_1 = require("./dto/start-trip.dto/start-trip.dto");
const end_trip_dto_1 = require("./dto/end-trip.dto/end-trip.dto");
const location_dto_1 = require("./dto/location.dto/location.dto");
let TripController = class TripController {
    tripService;
    constructor(tripService) {
        this.tripService = tripService;
    }
    startTrip(dto, headers) {
        return this.tripService.startTrip(dto, headers);
    }
    endTrip(id, dto) {
        return this.tripService.endTrip(id, dto);
    }
    addLocation(dto) {
        return this.tripService.addLocation(dto);
    }
    async getTripLocationsByDate(user_id, project_id, body) {
        try {
            return await this.tripService.getTripLocationsByDate({
                user_id,
                project_id,
                date: body.date,
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.TripController = TripController;
__decorate([
    (0, common_1.Post)('start'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [start_trip_dto_1.StartTripDto, Object]),
    __metadata("design:returntype", void 0)
], TripController.prototype, "startTrip", null);
__decorate([
    (0, common_1.Post)('end/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, end_trip_dto_1.EndTripDto]),
    __metadata("design:returntype", void 0)
], TripController.prototype, "endTrip", null);
__decorate([
    (0, common_1.Post)('location'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [location_dto_1.TripLocationDto]),
    __metadata("design:returntype", void 0)
], TripController.prototype, "addLocation", null);
__decorate([
    (0, common_1.Post)('locations'),
    __param(0, (0, common_1.Headers)('user_id')),
    __param(1, (0, common_1.Headers)('project_id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], TripController.prototype, "getTripLocationsByDate", null);
exports.TripController = TripController = __decorate([
    (0, common_1.Controller)('trips'),
    __metadata("design:paramtypes", [trip_service_1.TripService])
], TripController);
//# sourceMappingURL=trip.controller.js.map