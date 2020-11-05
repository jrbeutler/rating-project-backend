import { Injectable, NotFoundException } from '@nestjs/common';
import { AddUserInput } from './dto/add-user.input';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(data: AddUserInput): Promise<UserEntity> {
    const { firstName, lastName, position, email } = data;

    const user = this.userRepository.create({
      firstName,
      lastName,
      position,
      email,
    });
    await this.userRepository.insert(user);
    return user;
  }

  async findOneById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async findAll(): Promise<UserEntity[]> {
    const queryBuilder = this.userRepository.createQueryBuilder('users');

    return await queryBuilder.getMany();
  }

  async updateUser(userInput: UpdateUserInput): Promise<UserEntity> {
    const { id, firstName, lastName, position, email } = userInput;
    const user = await this.userRepository.save({
      id,
      firstName,
      lastName,
      position,
      email,
    });

    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async remove(id: number): Promise<boolean> {
    await this.userRepository.delete(id);
    return true;
  }
}
