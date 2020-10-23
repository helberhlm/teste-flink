import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreatePostDto } from '../dtos/create-post.dto';
import { FindPostsQueryDto } from '../dtos/find-posts-query-dto';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { Post } from '../entities/posts.entity';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {

  async findPosts(): Promise<Post[]> {
    return await this.find();
  }

  async findOnePost(id: string): Promise<Post> {
    return await this.findOneOrFail(id);
  }

  async createPost(
    createPostDto: CreatePostDto,
  ): Promise<Post> {
    const { title, description, image } = createPostDto;

    const post = this.create();
    post.title = title;
    post.description = description;
    post.image = image;
    try {
      await post.save();
      return post;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao criar post, tente novamente',
      );
    }
  }

  async updatePost(
    updatePostDto: UpdatePostDto,
    id: string,
  ): Promise<Post> {
    const { title, description, image } = updatePostDto;

    const post = await this.findOneOrFail(id);
    post.title = title;
    post.description = description;
    post.image = image;

    try {
      await post.save();
      return post;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao atualizar post, tente novamente',
      );
    }
  }
}
