import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateImageInput {
  @Field()
  file: string;
}
