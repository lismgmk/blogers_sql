import { Injectable } from '@nestjs/common';
import { INCORRECT_TYPE_VALIDATION_ERROR } from '@app/consts/ad-validation-const';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './blog.entity';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private blogsRepository: Repository<Blog>,
  ) {}
  getConst() {
    this.blogsRepository.find();
    return INCORRECT_TYPE_VALIDATION_ERROR;
  }
}
