// src/call-tracking/call-tracking.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CallTracking } from './entities/call-tracking.entity';
import * as dayjs from 'dayjs';

@Injectable()
export class CallTrackingService {
  constructor(
    @InjectRepository(CallTracking)
    private callRepo: Repository<CallTracking>,
  ) {}

  create(data: Partial<CallTracking>) {
    const call = this.callRepo.create(data);
    return this.callRepo.save(call);
  }

  async findAll(
    user_id: string,
    project_id: string,
    from_date?: string,
    to_date?: string,
  ) {
    let start: Date;
    let end: Date;

    if (from_date && to_date) {
      start = new Date(from_date);
      end = new Date(to_date);
    } else {
      const now = dayjs();
      start = now.startOf('day').toDate();
      end = now.endOf('day').toDate();
    }

    return this.callRepo.find({
      where: {
        user_id,
        project_id,
        create_date: Between(start, end),
      },
      order: { create_date: 'DESC' },
    });
  }

  findOne(id: number, user_id: string, project_id: string) {
    return this.callRepo.findOne({
      where: { id, user_id, project_id },
    });
  }

  async remove(id: number, user_id: string, project_id: string) {
    await this.callRepo.delete({ id, user_id, project_id });
    return { deleted: true };
  }
}
