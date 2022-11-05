import { Args, Query, Resolver } from '@nestjs/graphql';

import { AppInstructorsLoader } from '@/controllers/graphql/dataloaders/app-instructors.loader';
import { AppInstructor } from '@/controllers/graphql/types/app-instructor';
import {
  AppInstructorNotFoundException,
  ParamNotFoundException
} from '@/errors';

@Resolver(() => AppInstructor)
export class AppInstructorResolver {
  constructor(private readonly appInstructorsLoader: AppInstructorsLoader) {}

  @Query(() => AppInstructor)
  async appInstructor(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const appInstructor = await this.appInstructorsLoader.findByIds.load(id);
    if (!appInstructor) {
      throw new AppInstructorNotFoundException();
    }
    return appInstructor;
  }
}
