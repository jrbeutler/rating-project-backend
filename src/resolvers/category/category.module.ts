import { Module } from '@nestjs/common';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from '../../services/category.service';
import { PrismaService } from '../../services/prisma.service';

@Module({
  providers: [CategoryResolver, CategoryService, PrismaService],
})

export class CategoryModule {}
