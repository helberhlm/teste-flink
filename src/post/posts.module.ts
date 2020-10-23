import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './controllers/posts.controller';
import { PostRepository } from './repositories/posts.repository';
import { PostService } from './services/posts.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [PostsController],
  providers: [PostService],
  exports: [PostService]
})
export class PostsModule { }
