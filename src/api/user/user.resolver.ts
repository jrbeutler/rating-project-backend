import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { GetUsersArgs } from './dto/get-users.args';
import { AddUserInput } from './dto/add-user.input';

@Resolver(of => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(returns => UserEntity, { name: 'user' })
  async getUser(@Args('id') id: number): Promise<UserEntity> {
    return await this.userService.findOneById(id);
  }

  @Query(returns => [UserEntity], { name: 'users' })
  async getUsers(@Args() args: GetUsersArgs): Promise<UserEntity[]> {
    return await this.userService.findAll(args);
  }

  @Mutation(returns => UserEntity)
  async addUser(@Args('data') data: AddUserInput): Promise<UserEntity> {
    return await this.userService.create(data);
  }

  @Mutation(returns => Boolean)
  async delUser(@Args('id') id: string) {
    return await this.userService.remove(id);
  }
}
