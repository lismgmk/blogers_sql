import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';
import { EXPIRED } from '../../../consts/ad-validation-const';
import { CheckExpirationCode } from '../../../dto-validator/check-expiration-code';

export class CodeAuthDto {
  @CheckExpirationCode({ message: EXPIRED })
  @IsDate()
  @Type(() => Date)
  readonly code: Date;
}
