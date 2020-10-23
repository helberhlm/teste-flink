import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../repositories/users.repository';
import { UsersService } from './users.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import {
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';

const mockUserRepository = () => ({
  createUser: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
  findUsers: jest.fn(),
});

describe('UsersService', () => {
  let userRepository;
  let userService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UserRepository,
          useFactory: mockUserRepository,
        },
      ],
    }).compile();

    userRepository = await module.get<UserRepository>(UserRepository);
    userService = await module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('createUser', () => {
    let mockCreateUserDto: CreateUserDto;

    beforeEach(() => {
      mockCreateUserDto = {
        email: 'mock@email.com',
        name: 'Mock User',
        password: 'mockPassword',
      };
    });

    it('should create an user', async () => {
      userRepository.createUser.mockResolvedValue('mockUser');
      const result = await userService.createUser(mockCreateUserDto);

      expect(userRepository.createUser).toHaveBeenCalledWith(
        mockCreateUserDto,
      );
      expect(result).toEqual('mockUser');
    });

    it('should throw an error if passwords is insecure', async () => {
      mockCreateUserDto.password = 'insecurepassword';
      expect(userService.createUser(mockCreateUserDto)).rejects.toThrow(
        UnprocessableEntityException,
      );
    });
  });

  describe('findUserById', () => {
    it('should return the found user', async () => {
      userRepository.findOne.mockResolvedValue('mockUser');
      expect(userRepository.findOne).not.toHaveBeenCalled();

      const result = await userService.findUserById('mockId');
      const select = ['email', 'name', 'id'];
      expect(userRepository.findOne).toHaveBeenCalledWith('mockId', { select });
      expect(result).toEqual('mockUser');
    });

    it('should throw an error as user is not found', async () => {
      userRepository.findOne.mockResolvedValue(null);
      expect(userService.findUserById('mockId')).rejects.toThrow(NotFoundException);
    });
  });
});
