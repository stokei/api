import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Account } from './account';
import { App } from './app';
import { File } from './file';
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

  @Field(() => File, { nullable: true })
  file: File;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Image, { nullable: true })
  poster?: Image;

  @Field(() => Boolean)
  active: boolean;

  @Field(() => Boolean)
  private: boolean;

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
