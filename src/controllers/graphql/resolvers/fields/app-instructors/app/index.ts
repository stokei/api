import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { App } from '@/controllers/graphql/types/app';
import { AppInstructor } from '@/controllers/graphql/types/app-instructor';
import { AppInstructorModel } from '@/models/app-instructor.model';

@Resolver(() => AppInstructor)
export class AppInstructorAppResolver {
  constructor(private readonly appsLoader: AppsLoader) {}

  @ResolveField(() => App, { nullable: true })
  app(@Parent() appInstructor: AppInstructorModel) {
    return (
      appInstructor.app && this.appsLoader.findByIds.load(appInstructor.app)
    );
  }
}
