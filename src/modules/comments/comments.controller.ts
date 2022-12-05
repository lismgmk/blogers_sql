import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Put,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { GetUserId } from '../../decorators/get-user-id.decorator';
import { GetUser } from '../../decorators/get-user.decorator';
import { ValidationBodyExceptionFilter } from '../../exceptions/validation-body-exception-filter';
import { LikeStatusDto } from '../../global-dto/like-status.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CustomValidationPipe } from '../../pipes/validation.pipe';
import { LikesService } from '../likes/likes.service';
import { User } from '../../entity/user.entity';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(
    private commentsService: CommentsService,
    private readonly likesService: LikesService,
  ) {}

  @Put(':commentId/like-status')
  @HttpCode(204)
  @SkipThrottle()
  @UseFilters(new ValidationBodyExceptionFilter())
  @UseGuards(JwtAuthGuard)
  async addLikeStatuseComment(
    @Param('commentId', ParseUUIDPipe)
    commentId: string,
    @GetUserId()
    userId: string,
    @Body(new CustomValidationPipe())
    status: LikeStatusDto,
  ) {
    return await this.likesService.upDateLikesInfo({
      userId,
      status: status.likeStatus,
      commentId,
    });
  }

  @Put(':id')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  @UseFilters(new ValidationBodyExceptionFilter())
  async changeComment(
    @Param('id', ParseUUIDPipe)
    id: string,
    @Body(new CustomValidationPipe())
    content: CreateCommentDto,
    @GetUser() user: User,
  ) {
    return await this.commentsService.changeComment(
      id,
      content.content,
      user.id,
    );
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async deleteBlog(
    @Param('id', ParseUUIDPipe)
    id: string,
    @GetUserId() userId: string,
  ) {
    return await this.commentsService.deleteComment(id, userId);
  }

  @Get(':id')
  @HttpCode(200)
  @SkipThrottle()
  async getCommentById(
    @Param('id')
    id: string,
    @GetUser() user: User,
  ) {
    return this.commentsService.getCommentByIdWithLikes({
      id,
      userId: user ? user.id : null,
    });
  }
}
