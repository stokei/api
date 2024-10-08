import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataAppInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  slug?: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field({ nullable: true })
  hero?: string;

  @Field({ nullable: true })
  icon?: string;

  @Field({ nullable: true })
  logo?: string;
}

@InputType()
export class UpdateAppInput {
  @Field(() => UpdateDataAppInput)
  data: UpdateDataAppInput;
}
