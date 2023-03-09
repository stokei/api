import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereHeroInput {
  @Field()
  hero: string;
}

@InputType()
export class RemoveHeroInput {
  @Field(() => RemoveWhereHeroInput)
  where: RemoveWhereHeroInput;
}
