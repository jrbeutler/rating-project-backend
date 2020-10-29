import { IsOptional } from 'class-validator';
import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class GetUsersArgs {
  @Field(type => ID, { nullable: true })
  @IsOptional()
  public id?: number;
}
