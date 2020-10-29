import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType('users')
@Entity('users')
export class UserEntity {
  @Field()
  @PrimaryGeneratedColumn()
  public id: number;

  @Field()
  @Column({ name: 'first_name', type: 'varchar' })
  public firstName: string;

  @Field()
  @Column({ name: 'last_name', type: 'varchar' })
  public lastName: string;

  @Field()
  @Column({ name: 'position', type: 'varchar' })
  public position: string;

  @Field()
  @Column({ name: 'email', type: 'varchar' })
  public email: string;
}
