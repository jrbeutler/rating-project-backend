import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Category } from '../models/category.model';

@Injectable()
export class CategoryService {
  constructor(
    private prisma: PrismaService,
  ) {}

  getAllCategories(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }

  createCategory(categoryName: string) {
    return this.prisma.category.create({
      data: {
        name: categoryName
      }
    });
  }
}
