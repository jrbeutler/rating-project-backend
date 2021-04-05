import { Category } from '../../models/category.model';
import { Mutation, Resolver, Args, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../guards/gql-auth.guard';
import { CategoryService } from '../../services/category.service';
import { CategoryEntity } from '../../decorators/category.decorator';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Category)
  async createCategory(
    @CategoryEntity() category: Category,
    @Args('name') categoryName: string) {
    return this.categoryService.createCategory(categoryName);
  }

  @Query(() => [Category])
  async getAllCategories() {
    return this.categoryService.getAllCategories();
  }

  @Query(() => Category)
  async getCategoryByID(
  @CategoryEntity() category: Category,
  @Args('categoryID') categoryID: string) {
    return this.categoryService.getByID(categoryID);
  }
}
