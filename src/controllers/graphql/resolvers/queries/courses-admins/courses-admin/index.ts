import { Args, Query, Resolver } from '@nestjs/graphql';
import { CoursesAdminsLoader } from '@/controllers/graphql/dataloaders/courses-admins.loader';
import { CoursesAdmin } from '@/controllers/graphql/types/courses-admin';
import {
  CoursesAdminNotFoundException,
  ParamNotFoundException
} from '@/errors';

@Resolver(() => CoursesAdmin)
export class CoursesAdminResolver {
  constructor(private readonly coursesAdminsLoader: CoursesAdminsLoader) {}

  @Query(() => CoursesAdmin)
  async coursesAdmin(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const coursesAdmin = await this.coursesAdminsLoader.findByIds.load(id);
    if (!coursesAdmin) {
      throw new CoursesAdminNotFoundException();
    }
    return coursesAdmin;
  }
}
