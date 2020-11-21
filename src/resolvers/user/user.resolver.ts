import { GqlAuthGuard } from '../../guards/gql-auth.guard';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserEntity } from '../../decorators/user.decorator';
import { User } from '../../models/user.model';
import { ChangePasswordInput } from './dto/change-password.input';
import { UserService } from 'src/services/user.service';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver((of) => User)
@UseGuards(GqlAuthGuard)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query((returns) => User)
  async me(@UserEntity() user: User): Promise<User> {
    return user;
  }

  @Query((returns) => [User])
  async allUsers(@UserEntity() user: User): Promise<User[]> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.userService.allUsers();
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => User)
  async updateUser(
    @UserEntity() user: User,
    @Args('data') newUserData: UpdateUserInput
  ) {
    return this.userService.updateUser(user.id, newUserData);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => User)
  async changePassword(
    @UserEntity() user: User,
    @Args('data') changePassword: ChangePasswordInput
  ) {
    return this.userService.changePassword(
      user.id,
      user.password,
      changePassword
    );
  }
}
