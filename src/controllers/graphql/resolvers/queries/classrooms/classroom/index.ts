import { Args, Query, Resolver } from '@nestjs/graphql';
import { ClassroomsLoader } from '@/controllers/graphql/dataloaders/classrooms.loader';
import { Classroom } from '@/controllers/graphql/types/classroom';
import { ClassroomNotFoundException, ParamNotFoundException } from '@/errors';

@Resolver(() => Classroom)
export class ClassroomResolver {
  constructor(private readonly classroomsLoader: ClassroomsLoader) {}

  @Query(() => Classroom)
  async classroom(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const classroom = await this.classroomsLoader.findByIds.load(id);
    if (!classroom) {
      throw new ClassroomNotFoundException();
    }
    return classroom;
  }
}
