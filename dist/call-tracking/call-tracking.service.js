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
exports.CallTrackingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const call_tracking_entity_1 = require("./call-tracking.entity");
let CallTrackingService = class CallTrackingService {
    callTrackingRepository;
    constructor(callTrackingRepository) {
        this.callTrackingRepository = callTrackingRepository;
    }
    create(callTracking) {
        return this.callTrackingRepository.save(callTracking);
    }
    findAll() {
        return this.callTrackingRepository.find();
    }
    async findOne(id) {
        const record = await this.callTrackingRepository.findOneBy({ id });
        if (!record) {
            throw new common_1.NotFoundException(`CallTracking with ID ${id} not found`);
        }
        return record;
    }
    update(id, updateData) {
        return this.callTrackingRepository.update(id, updateData).then(() => { });
    }
    remove(id) {
        return this.callTrackingRepository.delete(id).then(() => { });
    }
};
exports.CallTrackingService = CallTrackingService;
exports.CallTrackingService = CallTrackingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(call_tracking_entity_1.CallTracking)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CallTrackingService);
//# sourceMappingURL=call-tracking.service.js.map