import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { ImagesLoader } from '@/controllers/graphql/dataloaders/images.loader';
import { Course } from '@/controllers/graphql/types/course';
import { Image } from '@/controllers/graphql/types/image';
import { CourseModel } from '@/models/course.model';

@Resolver(() => Course)
export class CourseAvatarResolver {
  constructor(private readonly imagesLoader: ImagesLoader) {}

  @ResolveField(() => Image, { nullable: true })
  avatar(@Parent() course: CourseModel) {
    return course.avatar && this.imagesLoader.findByIds.load(course.avatar);
  }
}
