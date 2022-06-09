import { Args, Query, Resolver } from '@nestjs/graphql';

import { ClassroomsPlansLoader } from '@/controllers/graphql/dataloaders/classrooms-plans.loader';
import { ClassroomsPlan } from '@/controllers/graphql/types/classrooms-plan';
import {
  ClassroomsPlanNotFoundException,
  ParamNotFoundException
} from '@/errors';

@Resolver(() => ClassroomsPlan)
export class ClassroomsPlanResolver {
  constructor(private readonly classroomsPlansLoader: ClassroomsPlansLoader) {}

  @Query(() => ClassroomsPlan)
  async classroomsPlan(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const classroomsPlan = await this.classroomsPlansLoader.findByIds.load(id);
    if (!classroomsPlan) {
      throw new ClassroomsPlanNotFoundException();
    }
    return classroomsPlan;
  }
}
