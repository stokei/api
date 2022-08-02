import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Account } from './account';
import { App } from './app';
import { Classroom } from './classroom';
import { Module } from './module';

@ObjectType()
export class ClassroomModule {
  @Field(() => ID)
  id: string;

  @Field(() => Classroom)
  classroom: Classroom;

  @Field(() => Module)
  module: Module;

  @Field(() => String, { nullable: true })
  updatedAt?: string;

  @Field(() => String, { nullable: true })
  createdAt?: string;

  @Field(() => Account, { nullable: true })
  updatedBy?: Account;

  @Field(() => Account, { nullable: true })
  createdBy?: Account;

  @Field(() => App, { nullable: true })
  app?: App;
}
