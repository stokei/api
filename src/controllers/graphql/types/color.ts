import { Field, ID, ObjectType } from '@nestjs/graphql';

import { ColorType } from '@/controllers/graphql/enums/color-type.enum';
import { ThemeMode } from '@/controllers/graphql/enums/theme-mode.enum';

import { Account } from './account';
import { App } from './app';

@ObjectType()
export class Color {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  color: string;

  @Field(() => ThemeMode)
  themeMode: ThemeMode;

  @Field(() => ColorType)
  type: ColorType;

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
