import { Resolver, ResolveReference } from '@nestjs/graphql';
import { ClassroomsTagsLoader } from '@/controllers/graphql/dataloaders/classrooms-tags.loader';
import { ClassroomsTag } from '@/controllers/graphql/types/classrooms-tag';

@Resolver(() => ClassroomsTag)
export class ClassroomsTagReferenceResolver {
  constructor(private readonly classroomsTagsLoader: ClassroomsTagsLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.classroomsTagsLoader.findByIds.load(reference.id);
  }
}
