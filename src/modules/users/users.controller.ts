import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Ip,
  Param,
  Post,
  Query,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ValidationBodyExceptionFilter } from '../../exceptions/validation-body-exception-filter';
import { CustomValidationPipe } from '../../pipes/validation.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { GetAllUsersQueryDto } from './dto/get-all-user-query.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(AuthGuard('basic'))
  @UseFilters(new ValidationBodyExceptionFilter())
  async createUser(
    @Ip() userIp: string,
    @Body(new CustomValidationPipe()) createUserDto: CreateUserDto,
  ) {
    const confirmationCode = new Date().toISOString();
    return await this.usersService.createUserClearQuery({
      ...createUserDto,
      userIp,
      confirmationCode,
      isConfirmed: true,
    });
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(AuthGuard('basic'))
  @UsePipes(new ValidationPipe({ transform: true }))
  async deleteUser(@Param('id') id: string) {
    return await this.usersService.deleteUserByIdClearQuery(id);
  }

  @Get()
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true }))
  async getAllUsers(@Query() queryParams: GetAllUsersQueryDto) {
    return await this.usersService.getAllUsersClearQuery(queryParams);
  }
}
