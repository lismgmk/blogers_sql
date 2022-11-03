import { INCORRECT_TYPE_VALIDATION_ERROR } from './../../consts/ad-validation-const';
import { Injectable } from '@nestjs/common';
// import { INCORRECT_TYPE_VALIDATION_ERROR } from '@app/consts/ad-validation-const';

@Injectable()
export class BlogsService {
  getConst() {
    return INCORRECT_TYPE_VALIDATION_ERROR;
  }
}
