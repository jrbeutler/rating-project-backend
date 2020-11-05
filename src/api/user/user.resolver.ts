import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { AddUserInput } from './dto/add-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(of => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(returns => UserEntity, { name: 'user' })
  async getUser(@Args('id') id: number): Promise<UserEntity> {
    return await this.userService.findOneById(id);
  }

  @Query(returns => [UserEntity], { name: 'users' })
  async getUsers(): Promise<UserEntity[]> {
    return await this.userService.findAll();
  }

  @Mutation(returns => UserEntity)
  async addUser(@Args('data') data: AddUserInput): Promise<UserEntity> {
    return await this.userService.create(data);
  }

  @Mutation(returns => UserEntity)
  async updateUser(@Args('data') data: UpdateUserInput): Promise<UserEntity> {
    return await this.userService.updateUser(data);
  }

  @Mutation(returns => Boolean)
  async delUser(@Args('id') id: number) {
    return await this.userService.remove(id);
  }
}
