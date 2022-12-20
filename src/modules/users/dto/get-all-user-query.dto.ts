import { IsOptional, IsEnum } from 'class-validator';
import { INCORRECT_TYPE_VALIDATION_ERROR } from '../../../consts/ad-validation-const';
import { PaginationQueryDto } from '../../../global-dto/pagination-query.dto';
import { SortByField } from '../../blogs/dto/blogs-intergaces';

export class GetAllUsersQueryDto extends PaginationQueryDto {
  @IsOptional()
  readonly searchLoginTerm: string;

  @IsOptional()
  readonly searchEmailTerm: string;

  @IsEnum(SortByField, { message: INCORRECT_TYPE_VALIDATION_ERROR })
  @IsOptional()
  readonly sortBy: keyof typeof SortByField = 'createdAt';
}
