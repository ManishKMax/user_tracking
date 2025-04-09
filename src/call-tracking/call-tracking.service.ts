import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CallTracking } from './call-tracking.entity';

@Injectable()
export class CallTrackingService {
  constructor(
    @InjectRepository(CallTracking)
    private callTrackingRepository: Repository<CallTracking>,
  ) {}

  create(callTracking: CallTracking): Promise<CallTracking> {
    return this.callTrackingRepository.save(callTracking);
  }

  findAll(): Promise<CallTracking[]> {
    return this.callTrackingRepository.find();
  }

 async findOne(id: number): Promise<CallTracking> {
  const record = await this.callTrackingRepository.findOneBy({ id });
  if (!record) {
    throw new NotFoundException(`CallTracking with ID ${id} not found`);
  }
  return record;
}
  update(id: number, updateData: Partial<CallTracking>): Promise<void> {
    return this.callTrackingRepository.update(id, updateData).then(() => {});
  }

  remove(id: number): Promise<void> {
    return this.callTrackingRepository.delete(id).then(() => {});
  }
}
