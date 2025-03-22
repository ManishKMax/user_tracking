import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './provider/users.service';
import { UserTracking } from './entity/user-tracking.entity';
import { UserCheckHistory } from './entity/user-check-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserTracking, UserCheckHistory]),],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
