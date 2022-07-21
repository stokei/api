import { Field, InputType } from '@nestjs/graphql';

import { ColorType } from '@/controllers/graphql/enums/color-type.enum';
import { ThemeMode } from '@/controllers/graphql/enums/theme-mode.enum';

@InputType()
export class CreateColorInput {
  @Field()
  parent: string;

  @Field(() => ThemeMode)
  themeMode: ThemeMode;

  @Field(() => ColorType)
  type: ColorType;

  @Field()
  color: string;
}
