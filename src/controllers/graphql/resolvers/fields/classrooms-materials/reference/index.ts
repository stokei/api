import { Resolver, ResolveReference } from '@nestjs/graphql';
import { ClassroomsMaterialsLoader } from '@/controllers/graphql/dataloaders/classrooms-materials.loader';
import { ClassroomsMaterial } from '@/controllers/graphql/types/classrooms-material';

@Resolver(() => ClassroomsMaterial)
export class ClassroomsMaterialReferenceResolver {
  constructor(
    private readonly classroomsMaterialsLoader: ClassroomsMaterialsLoader
  ) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.classroomsMaterialsLoader.findByIds.load(reference.id);
  }
}
