import { Field, InputType } from '@nestjs/graphql';

import { CreateComponentInput } from './create-component.input';

@InputType()
export class CreateComponentsTreeComponentInput extends CreateComponentInput {
  @Field(() => [CreateComponentsTreeComponentInput])
  components: CreateComponentsTreeComponentInput[];
}

@InputType()
export class CreateComponentsTreeInput {
  @Field(() => [CreateComponentsTreeComponentInput])
  tree: CreateComponentsTreeComponentInput[];
}
