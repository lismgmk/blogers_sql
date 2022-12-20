import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckIpAttemptService } from './check-ip-attempt.service';
import { CheckIpAttempt } from '../../entity/checkIpAttempt.entity';
import { rootInstanceSwitcher } from '../../config/switchers/rootSwitcher';

@Module({
  imports: [TypeOrmModule.forFeature([CheckIpAttempt])],
  providers: [rootInstanceSwitcher.checkIp(), CheckIpAttemptService],
})
export class CheckIpAttemptModule {}
