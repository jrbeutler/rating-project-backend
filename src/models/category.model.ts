import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Category {
  @Field((type) => ID)
  id: string;
  name: string;
  isActive: boolean;
}
