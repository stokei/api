import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';

import { FileStatus } from '@/controllers/graphql/enums/file-status.enum';

import { Account } from './account';
import { App } from './app';

@ObjectType()
export class File {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: true })
  extension?: string;

  @Field(() => String, { nullable: true })
  mimetype?: string;

  @Field(() => Int, { nullable: true })
  size?: number;

  @Field(() => String)
  filename: string;

  @Field(() => String, { nullable: true })
  url?: string;

  @Field(() => Float, { nullable: true })
  duration?: number;

  @Field(() => FileStatus)
  status: FileStatus;

  @Field(() => Boolean)
  active: boolean;

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
