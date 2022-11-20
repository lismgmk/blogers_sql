import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Put,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { GetUser } from '../../decorators/get-user.decorator';
import { ValidationBodyExceptionFilter } from '../../exceptions/validation-body-exception-filter';
import { LikeStatusDto } from '../../global-dto/like-status.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CustomValidationPipe } from '../../pipes/validation.pipe';
import { User } from '../users/user.entity';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  // @Put(':commentId/like-status')
  // @HttpCode(204)
  // @SkipThrottle()
  // @UseFilters(new ValidationBodyExceptionFilter())
  // @UseGuards(JwtAuthGuard)
  // async addLikeStatuseComment(
  //   @Param('commentId')
  //   commentId: string,
  //   @GetUser()
  //   user: User,
  //   @Body(new CustomValidationPipe())
  //   likeStatus: LikeStatusDto,
  // ) {
  //   return await this.commentsService.addLikeStatuseComment(
  //     user,
  //     likeStatus.likeStatus,
  //     commentId,
  //   );
  // }

  // @Put(':id')
  // @HttpCode(204)
  // @UseGuards(JwtAuthGuard)
  // @UseFilters(new ValidationBodyExceptionFilter())
  // async changeComment(
  //   @Param('id')
  //   id: string,
  //   @Body(new CustomValidationPipe())
  //   content: CreateCommentDto,
  //   @GetUser() user: User,
  // ) {
  //   return await this.commentsService.changeComment(
  //     id,
  //     content.content,
  //     user.id,
  //   );
  // }

  // @Delete(':id')
  // @HttpCode(204)
  // @UseGuards(JwtAuthGuard)
  // @UsePipes(new ValidationPipe({ transform: true }))
  // async deleteBlog(
  //   @Param('id')
  //   id: string,
  // ) {
  //   return await this.commentsService.deleteCommentById(id);
  // }

  // @Get(':id')
  // @HttpCode(200)
  // @SkipThrottle()
  // async getPostById(
  //   @Param('id')
  //   id: string,
  //   @GetUser() user: User,
  // ) {
  //   return this.commentsService.getCommentByIdWithLikes(
  //     id,
  //     user ? user.id : null,
  //   );
  // }
}
