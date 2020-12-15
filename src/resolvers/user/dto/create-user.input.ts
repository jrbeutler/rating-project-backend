import { InputType, Field } from '@nestjs/graphql';
import { Role } from "../../../models/user.model";

@InputType()
export class CreateNewUser {
  @Field({ nullable: false })
  firstname: string;
  @Field({ nullable: false })
  lastname: string;
  @Field({ nullable: false })
  email: string;
  @Field({ nullable: false })
  role: Role;
  @Field({ nullable: false })
  password: string;
}