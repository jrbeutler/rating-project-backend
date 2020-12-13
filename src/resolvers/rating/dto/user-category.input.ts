import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UserCategoryInput {
  @Field({ nullable: false })
  userID: string;
  @Field({ nullable: false })
  categoryID: string;
}
