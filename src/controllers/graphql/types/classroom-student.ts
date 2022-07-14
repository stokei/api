import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
//@Directive('@key(fields: "id")')
export class ClassroomStudent {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  classroom: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  updatedAt?: string;

  @Field()
  createdAt?: string;
}
