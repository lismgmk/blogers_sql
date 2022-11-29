import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckIpAttemptService } from './check-ip-attempt.service';
import { CheckIpAttempt } from './checkIpAttempt.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CheckIpAttempt])],
  providers: [CheckIpAttemptService],
})
export class CheckIpAttemptModule {}
