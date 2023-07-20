import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Account } from './account';
import { App } from './app';
import { File } from './file';
import { Image } from './image';

@ObjectType()
export class Material {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: true })
  parent?: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => File, { nullable: true })
  file: File;

  @Field(() => Image, { nullable: true })
  avatar?: Image;

  @Field(() => Boolean)
  free: boolean;

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
