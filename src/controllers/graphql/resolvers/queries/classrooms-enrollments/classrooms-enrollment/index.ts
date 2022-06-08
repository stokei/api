import { Args, Query, Resolver } from '@nestjs/graphql';
import { ClassroomsEnrollmentsLoader } from '@/controllers/graphql/dataloaders/classrooms-enrollments.loader';
import { ClassroomsEnrollment } from '@/controllers/graphql/types/classrooms-enrollment';
import {
  ClassroomsEnrollmentNotFoundException,
  ParamNotFoundException
} from '@/errors';

@Resolver(() => ClassroomsEnrollment)
export class ClassroomsEnrollmentResolver {
  constructor(
    private readonly classroomsEnrollmentsLoader: ClassroomsEnrollmentsLoader
  ) {}

  @Query(() => ClassroomsEnrollment)
  async classroomsEnrollment(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const classroomsEnrollment =
      await this.classroomsEnrollmentsLoader.findByIds.load(id);
    if (!classroomsEnrollment) {
      throw new ClassroomsEnrollmentNotFoundException();
    }
    return classroomsEnrollment;
  }
}
