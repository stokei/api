import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChartData {
  @Field(() => String)
  label: string;

  @Field(() => String)
  value: string;
}
