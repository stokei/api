import { Field, InputType } from '@nestjs/graphql';

import { HeroType } from '@/controllers/graphql/enums/hero-type.enum';

@InputType()
export class CreateHeroInput {
  @Field()
  parent: string;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => HeroType, { nullable: true })
  type: HeroType;

  @Field(() => String, { nullable: true })
  subtitle?: string;

  @Field(() => String, { nullable: true })
  titleHighlight?: string;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => String, { nullable: true })
  backgroundImage?: string;

  @Field(() => String, { nullable: true })
  video?: string;
}
