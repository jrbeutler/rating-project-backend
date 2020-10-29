import { MaxLength, IsString, IsEmail } from 'class-validator';
import { Field, InputType, ID } from 'type-graphql';

@InputType('addUser')
export class AddUserInput {
  @Field()
  @IsString()
  @MaxLength(200)
  public firstName: string;

  @Field()
  @IsString()
  @MaxLength(200)
  public lastName: string;

  @Field()
  @IsString()
  @MaxLength(200)
  public position: string;

  @Field()
  @IsEmail()
  @IsString()
  @MaxLength(200)
  public email: string;
}
