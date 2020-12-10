import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class CategoryService {
  constructor(
    private prisma: PrismaService,
  ) {}

  createCategory(categoryName: string) {
    return this.prisma.category.create({
      data: {
        name: categoryName
      }
    });
  }
}
