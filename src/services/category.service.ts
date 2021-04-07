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

  getByID(categoryID: string): Promise<Category> {
    return this.prisma.category.findOne({
      where: {
        id: categoryID
      }
    });
  }

  createCategory(categoryName: string): any {
    return this.prisma.category.create({
      data: {
        name: categoryName
      }
    });
  }

  archiveCategory(categoryID: string): Promise<Category> {
    return this.prisma.category.update({
      data: {
        isActive: false,
      },
      where: {
        id: categoryID
      }
    });
  };

  activateCategory(categoryID: string): Promise<Category> {
    return this.prisma.category.update({
      data: {
        isActive: true,
      },
      where: {
        id: categoryID
      }
    });
  };
}
