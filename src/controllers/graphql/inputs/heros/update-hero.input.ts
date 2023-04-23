import { Field, InputType } from '@nestjs/graphql';

import { HeroType } from '@/controllers/graphql/enums/hero-type.enum';
@InputType()
export class UpdateDataHeroInput {
  @Field({ nullable: true })
  title?: string;

  @Field(() => HeroType, { nullable: true })
  type?: HeroType;

  @Field({ nullable: true })
  subtitle?: string;

  @Field({ nullable: true })
  titleHighlight?: string;

  @Field({ nullable: true })
  image?: string;

  @Field({ nullable: true })
  backgroundImage?: string;

  @Field({ nullable: true })
  video?: string;
}

@InputType()
export class UpdateWhereHeroInput {
  @Field()
  hero: string;
}

@InputType()
export class UpdateHeroInput {
  @Field(() => UpdateDataHeroInput)
  data: UpdateDataHeroInput;

  @Field(() => UpdateWhereHeroInput)
  where: UpdateWhereHeroInput;
}
