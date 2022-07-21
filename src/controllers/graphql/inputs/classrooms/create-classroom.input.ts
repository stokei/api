import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateClassroomInput {
  @Field()
  parent: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Boolean, { nullable: true })
  hasAccessToAllModules?: boolean;
}
