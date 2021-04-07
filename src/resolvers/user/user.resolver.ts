import { GqlAuthGuard } from '../../guards/gql-auth.guard';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserEntity } from '../../decorators/user.decorator';
import { Role, User } from '../../models/user.model';
import { UserService } from 'src/services/user.service';
import { UpdateUserInput } from './dto/update-user.input';
import { CreateNewUser } from "./dto/create-user.input";

@Resolver((of) => User)
@UseGuards(GqlAuthGuard)
export class UserResolver {
  constructor(private userService: UserService) {
  }

  @Query((returns) => User)
  async me(@UserEntity() user: User): Promise<User> {
    return user;
  }

  @Query((returns) => User)
  async userByID(
    @UserEntity() user: User,
    @Args('userID') userID: string): Promise<User> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.userService.userByID(userID);
  }

  @Query((returns) => [User])
  async allUsers(@UserEntity() user: User): Promise<User[]> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.userService.allUsers();
  }

  @Query((returns) => [User])
  async allApprentices(@UserEntity() user: User): Promise<User[]> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.userService.allApprentices();
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => User)
  async createUser(
    @UserEntity() user: User,
    @Args('data') newUserData: CreateNewUser
  ) {
    return this.userService.createUser(newUserData);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => User)
  async updateUser(
    @UserEntity() user: User,
    @Args('data') newUserData: UpdateUserInput,
  ) {
    return this.userService.updateUser(user.id,
      newUserData
      );
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async archiveUser(
      @UserEntity() user: User,
      @Args('userID') userID: string): Promise<User> {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return this.userService.archiveUser(userID);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async activateUser(
      @UserEntity() user: User,
      @Args('userID') userID: string): Promise<User> {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return this.userService.activateUser(userID);
  }
}
