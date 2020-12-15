import { ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';

@ObjectType()
export class Rating extends BaseModel {
  reviewerID: string;
  reviewedID: string;
  categoryID: string;
  rating: number;
  notes?: string;
}
