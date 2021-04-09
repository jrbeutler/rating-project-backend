import { ObjectType, registerEnumType, HideField } from '@nestjs/graphql';
import { BaseModel } from './base.model';

export enum Role {
  ADMIN = 'ADMIN',
  APPRENTICE = "APPRENTICE",
  FTE = "FTE",
}

registerEnumType(Role, {
  name: 'Role',
  description: 'User role',
});

@ObjectType()
export class User extends BaseModel {
  email: string;
  firstname?: string;
  lastname?: string;
  role: Role;
  isActive: boolean;
  @HideField()
  password: string;
}
