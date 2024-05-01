import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateComponentsOrderInput {
  @Field(() => [String])
  components: string[];
}
