import { Args, Query, Resolver } from '@nestjs/graphql';

import { ClassroomsTagsLoader } from '@/controllers/graphql/dataloaders/classrooms-tags.loader';
import { ClassroomsTag } from '@/controllers/graphql/types/classrooms-tag';
import {
  ClassroomsTagNotFoundException,
  ParamNotFoundException
} from '@/errors';

@Resolver(() => ClassroomsTag)
export class ClassroomsTagResolver {
  constructor(private readonly classroomsTagsLoader: ClassroomsTagsLoader) {}

  @Query(() => ClassroomsTag)
  async classroomsTag(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const classroomsTag = await this.classroomsTagsLoader.findByIds.load(id);
    if (!classroomsTag) {
      throw new ClassroomsTagNotFoundException();
    }
    return classroomsTag;
  }
}
