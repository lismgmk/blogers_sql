import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from '../../entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtPassService } from '../common-services/jwt-pass-custom/jwt-pass.service';
import { JwtService } from '@nestjs/jwt';
import { rootInstanceSwitcher } from '../../config/switchers/rootSwitcher';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    JwtPassService,
    JwtService,
    rootInstanceSwitcher.users(),
  ],
})
export class UsersModule {}
