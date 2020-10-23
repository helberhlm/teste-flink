import { BaseQueryParametersDto } from '../../common/dto/base-query-paramers.dto';

export class FindUsersQueryDto extends BaseQueryParametersDto {
  name: string;
  email: string;
  status: boolean;
}
