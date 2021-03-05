import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from "class-validator";

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  firstname?: string;
  @Field({ nullable: true })
  lastname?: string;
  @Field()
  @IsNotEmpty()
  oldPassword: string;
  @Field()
  @IsNotEmpty()
  newPassword: string;
}
