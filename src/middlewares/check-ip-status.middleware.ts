import {
  Injectable,
  NestMiddleware,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import { CheckIpAttemptService } from '../modules/check-ip-attempt/check-ip-attempt.service';

@Injectable()
export class CheckIpStatusMiddleware implements NestMiddleware {
  constructor(
    private configService: ConfigService,
    private checkIpAttemptService: CheckIpAttemptService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const attemptsLimit = Number(
      this.configService.get<string>('ATTEMPTS_LIMIT'),
    );

    const findAllUsersIp = await this.checkIpAttemptService.getAllUsersIp({
      userIp: req.ip,
      path: req.path,
    });
    if (findAllUsersIp.length >= attemptsLimit) {
      throw new HttpException(
        'Too many request from one ip',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
    await this.checkIpAttemptService.createUsersIp({
      userIp: req.ip,
      path: req.path,
    });
    return next();
  }
}
