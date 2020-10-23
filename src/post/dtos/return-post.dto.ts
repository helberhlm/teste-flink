import { Post } from "../entities/posts.entity";

export class ReturnPostDto {
  post: Post;
  message: string;
}
