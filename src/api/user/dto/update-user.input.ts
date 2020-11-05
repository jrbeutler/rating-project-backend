import { MaxLength, IsNumber, IsString } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType('updateUser')
export class UpdateUserInput {
  @Field()
  @IsNumber()
  public id: number;

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
  @IsString()
  @MaxLength(200)
  public email: string;
}
