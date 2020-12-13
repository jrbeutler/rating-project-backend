import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateRatingInput {
  @Field({ nullable: false })
  reviewerID: string;
  @Field({ nullable: false })
  reviewedID: string;
  @Field({ nullable: false })
  categoryID: string;
  @Field({ nullable: false })
  rating: number;
  @Field({ nullable: true })
  notes?: string;
}
