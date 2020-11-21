import { InputType, Field } from '@nestjs/graphql';
import { Category } from '../../models/rating.model';

@InputType()
export class CreateRatingInput {
  @Field({ nullable: false })
  reviewerID: string;
  @Field({ nullable: false })
  reviewedID: string;
  @Field({ nullable: false })
  category: Category;
  @Field({ nullable: false })
  rating: number;
  @Field({ nullable: true })
  notes?: string;
}
