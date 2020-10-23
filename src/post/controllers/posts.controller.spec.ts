import { Test, TestingModule } from '@nestjs/testing';

import {
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';
import { PostRepository } from '../repositories/posts.repository';
import { PostService } from '../services/posts.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';

const mockPostRepository = () => ({
  createPost: jest.fn(),
  updatePost: jest.fn(),
  getPost: jest.fn(),
  indexPosts: jest.fn(),
  deletePost: jest.fn(),
});

describe('PostService', () => {
  let postRepository;
  let postService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: PostRepository,
          useFactory: mockPostRepository,
        },
      ],
    }).compile();

    postRepository = await module.get<PostRepository>(PostRepository);
    postService = await module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(postService).toBeDefined();
    expect(postRepository).toBeDefined();
  });

  describe('createPost', () => {
    let mockCreatePostDto: CreatePostDto;

    beforeEach(() => {
      mockCreatePostDto = {
        title: 'Primeiro Post',
        description: 'Post de teste',
        image: 'http://localhost/image.png',
      };
    });

    it('should create an post', async () => {
      postRepository.createPost.mockResolvedValue('mockPost');
      const result = await postService.createPost(mockCreatePostDto);

      expect(postRepository.createPost).toHaveBeenCalledWith(mockCreatePostDto);
      expect(result).toEqual('mockPost');
    });

    it('should throw an error if image URL is invalid', async () => {
      mockCreatePostDto.image = 'wrongURL';
      expect(postService.createPost(mockCreatePostDto)).rejects.toThrow(
        UnprocessableEntityException,
      );
    });
  });

  describe('updatePost', () => {
    let mockUpdatePostDto: UpdatePostDto;

    beforeEach(() => {
      mockUpdatePostDto = {
        title: 'Update Post',
        description: 'Post de teste',
        image: 'http://localhost/image.png',
      };
    });

    it('should update an post', async () => {
      postRepository.updatePost.mockResolvedValue('mockPost');
      const result = await postService.updatePost(mockUpdatePostDto, 1);

      expect(postRepository.updatePost).toHaveBeenCalledWith(mockUpdatePostDto, 1);
      expect(result).toEqual('mockPost');
    });

    it('should throw an error if image URL is invalid', async () => {
      mockUpdatePostDto.image = 'wrongURL';
      expect(postService.createPost(mockUpdatePostDto)).rejects.toThrow(
        UnprocessableEntityException,
      );
    });
  });

  describe('indexPosts', () => {
    it('should index all posts', async () => {
      postRepository.indexPosts.mockResolvedValue('mockPost');
      expect(postRepository.indexPosts).not.toHaveBeenCalled();

    });
  });
});
