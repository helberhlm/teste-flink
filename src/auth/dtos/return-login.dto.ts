import { User } from "src/user/entities/user.entity";

export class ReturnLoginDto {
  token: string;
  user: User;
}
