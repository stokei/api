import { Field, ID, ObjectType } from '@nestjs/graphql';

import { App } from './app';
import { Image } from './image';
import { Video } from './video';

@ObjectType()
export class Hero {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  parent: string;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  titleHighlight?: string;

  @Field(() => String, { nullable: true })
  subtitle?: string;

  @Field(() => Image, { nullable: true })
  image?: Image;

  @Field(() => Video, { nullable: true })
  video?: Video;

  @Field(() => App)
  app: App;

  @Field(() => String, { nullable: true })
  updatedAt?: string;

  @Field(() => String, { nullable: true })
  createdAt?: string;

  @Field(() => Hero, { nullable: true })
  updatedBy?: Hero;

  @Field(() => Hero, { nullable: true })
  createdBy?: Hero;
}
