import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataHeroInput {
  @Field({ nullable: true })
  title?: string;

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
