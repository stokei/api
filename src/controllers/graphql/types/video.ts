import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import { VideoStatus } from '@/controllers/graphql/enums/video-status.enum';

import { Account } from './account';
import { App } from './app';
import { Image } from './image';
import { VideoAuthors } from './video-authors';

@ObjectType()
export class Video {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  slug: string;

  @Field(() => String)
  path: string;

  @Field(() => String)
  url: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Image, { nullable: true })
  poster?: Image;

  @Field(() => Int)
  duration?: number;

  @Field(() => VideoStatus)
  status: VideoStatus;

  @Field(() => Boolean)
  active: boolean;

  @Field(() => VideoAuthors)
  authors: VideoAuthors;

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
