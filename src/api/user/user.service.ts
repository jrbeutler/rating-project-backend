import { Injectable, NotFoundException } from '@nestjs/common';
import { AddUserInput } from './dto/add-user.input';
import { GetUsersArgs } from './dto/get-users.args';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  async findAll(args: GetUsersArgs): Promise<UserEntity[]> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    return await queryBuilder.getMany();
  }

  async remove(id: string): Promise<boolean> {
    await this.userRepository.delete(id);
    return true;
  }
}
