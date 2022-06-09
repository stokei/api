import { Args, Query, Resolver } from '@nestjs/graphql';

import { ClassroomsMaterialsLoader } from '@/controllers/graphql/dataloaders/classrooms-materials.loader';
import { ClassroomsMaterial } from '@/controllers/graphql/types/classrooms-material';
import {
  ClassroomsMaterialNotFoundException,
  ParamNotFoundException
} from '@/errors';

@Resolver(() => ClassroomsMaterial)
export class ClassroomsMaterialResolver {
  constructor(
    private readonly classroomsMaterialsLoader: ClassroomsMaterialsLoader
  ) {}

  @Query(() => ClassroomsMaterial)
  async classroomsMaterial(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const classroomsMaterial =
      await this.classroomsMaterialsLoader.findByIds.load(id);
    if (!classroomsMaterial) {
      throw new ClassroomsMaterialNotFoundException();
    }
    return classroomsMaterial;
  }
}
