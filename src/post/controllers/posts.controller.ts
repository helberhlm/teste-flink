import { Controller, Post, Body, ValidationPipe, Put, Param, Get, UseGuards, Delete } from '@nestjs/common';
import { PostService } from '../services/posts.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { ReturnPostDto } from '../dtos/return-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Posts')
@Controller('posts')
@UseGuards(AuthGuard())
export class PostsController {
  constructor(private postsService: PostService) { }

  @Post()
  async createPost(
    @Body(ValidationPipe) createPostDto: CreatePostDto,
  ): Promise<ReturnPostDto> {
    const post = await this.postsService.createPost(createPostDto);
    return {
      post,
      message: 'Post criado com sucesso!'
    };
  }

  @Put(':id')
  async updatePost(
    @Body(ValidationPipe) updatePostDto: UpdatePostDto,
    @Param('id') id: string,
  ) {
    return this.postsService.updatePost(updatePostDto, id);
  }

  @Get(':id')
  async getPost(
    @Param('id') id: string,
  ) {
    return this.postsService.getPost(id);
  }


  @Get()
  async indexPosts() {
    return this.postsService.findPosts();
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(id);
  }
}
