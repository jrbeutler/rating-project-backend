import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType({ isAbstract: true })
export class CategoryAverage {
  @Field()
  categoryID: string;
  @Field()
  name: string;
  @Field()
  isActive: boolean;
  @Field()
  average: number;
}
