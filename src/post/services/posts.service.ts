import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from '../repositories/posts.repository';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Post } from '../entities/posts.entity';
import { UpdatePostDto } from '../dtos/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostRepository)
    private postRepository: PostRepository,
  ) { }

  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    return this.postRepository.createPost(createPostDto);
  }

  async getPost(postId: string): Promise<Post> {
    const post = await this.postRepository.findOnePost(postId);

    if (!post) throw new NotFoundException('Post não encontrado');

    return post;
  }

  async findPosts(): Promise<Post[]> {
    const posts = await this.postRepository.findPosts();
    return posts;
  }

  async updatePost(updatePostDto: UpdatePostDto, id: string): Promise<Post> {
    const result = await this.postRepository.updatePost(updatePostDto, id);
    return result;
  }

  async deletePost(id: string) {
    const result = await this.postRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(
        'Não foi encontrado post com o ID informado',
      );
    }
  }
}
