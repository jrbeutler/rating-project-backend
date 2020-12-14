import { Injectable, BadRequestException } from '@nestjs/common';
import { PasswordService } from './password.service';
import { PrismaService } from './prisma.service';
import { ChangePasswordInput } from '../resolvers/user/dto/change-password.input';
import { UpdateUserInput } from '../resolvers/user/dto/update-user.input';
import { Role } from "../models/user.model";
import { CreateNewUser } from "../resolvers/user/dto/create-user.input";

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService
  ) {}

  allUsers() {
    return this.prisma.user.findMany();
  }

  userByID(userID: string) {
    return this.prisma.user.findOne({
      where: {
        id: userID,
      },
    });
  }

  createUser(newUserData: CreateNewUser) {
    return this.prisma.user.create({
      data: {
        firstname: newUserData.firstname,
        lastname: newUserData.lastname,
        email: newUserData.email,
        role: newUserData.role,
        password: newUserData.password,
      }
    });
  }

  updateUser(userId: string, newUserData: UpdateUserInput) {
    return this.prisma.user.update({
      data: newUserData,
      where: {
        id: userId,
      },
    });
  }

  async changePassword(
    userId: string,
    userPassword: string,
    changePassword: ChangePasswordInput
  ) {
    const passwordValid = await this.passwordService.validatePassword(
      changePassword.oldPassword,
      userPassword
    );

    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }

    const hashedPassword = await this.passwordService.hashPassword(
      changePassword.newPassword
    );

    return this.prisma.user.update({
      data: {
        password: hashedPassword,
      },
      where: { id: userId },
    });
  }
}
