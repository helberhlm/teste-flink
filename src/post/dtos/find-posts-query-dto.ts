import { BaseQueryParametersDto } from '../../common/dto/base-query-paramers.dto';

export class FindPostsQueryDto extends BaseQueryParametersDto {
  title: string;
  description: string;
}
