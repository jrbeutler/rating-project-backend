import { Injectable, BadRequestException } from '@nestjs/common';
import { PasswordService } from './password.service';
import { PrismaService } from './prisma.service';
import { UpdateUserInput } from '../resolvers/user/dto/update-user.input';
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

  allApprentices() {
    return this.prisma.user.findMany(
      {
        where: {
          role: 'APPRENTICE',
        }
      }
    );
  }

  userByID(userID: string) {
    return this.prisma.user.findOne({
      where: {
        id: userID,
      },
    });
  }

  async createUser(newUserData: CreateNewUser) {
    const hashedPassword = await this.passwordService.hashPassword(newUserData.password);
    return this.prisma.user.create({
      data: {
        firstname: newUserData.firstname,
        lastname: newUserData.lastname,
        email: newUserData.email,
        role: newUserData.role,
        isActive: true,
        password: hashedPassword,
      }
    });
  }

  async updateUser(userId: string,
                   newUserData: UpdateUserInput,
                   ) {

    const passwordValid = await this.passwordService.validatePassword(
      newUserData.oldPassword,
      newUserData.newPassword
    );

    if (passwordValid) {
      throw new BadRequestException('Invalid password');
    }

    const hashedPassword = await this.passwordService.hashPassword(
      newUserData.newPassword
    );

    return this.prisma.user.update({
      data: {
        firstname: newUserData.firstname,
        lastname: newUserData.lastname,
        password: hashedPassword },
      where: {
        id: userId,
      },
    });
  };

  async archiveUser(userID: string) {
    return this.prisma.user.update({
      data: {
        isActive: false,
      },
      where: {
        id: userID,
      }
    });
  };

  async activateUser(userID: string) {
    return this.prisma.user.update({
      data: {
        isActive: true,
      },
      where: {
        id: userID,
      }
    });
  };
}
