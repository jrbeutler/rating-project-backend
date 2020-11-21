import { ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseModel } from './base.model';

export enum Category {
  FRONTEND = 'FRONTEND',
  BACKEND = 'BACKEND',
}

registerEnumType(Category, {
  name: 'Category',
  description: 'User Category Graded',
});

@ObjectType()
export class Rating extends BaseModel {
  reviewerID: string;
  reviewedID: string;
  category: Category;
  rating: number;
  notes?: string;
}
