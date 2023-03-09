import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateHeroInput {
  @Field()
  parent: string;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  subtitle?: string;

  @Field({ nullable: true })
  titleHighlight?: string;

  @Field({ nullable: true })
  image?: string;

  @Field({ nullable: true })
  video?: string;
}
