import { BlogsService } from './blogs.service';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class BlogsController {
  constructor(private readonly blogService: BlogsService) {}

  @Get()
  getConst() {
    return this.blogService.getConst();
  }
}
