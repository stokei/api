import { Resolver, ResolveReference } from '@nestjs/graphql';
import { ClassroomsModulesLoader } from '@/controllers/graphql/dataloaders/classrooms-modules.loader';
import { ClassroomsModule } from '@/controllers/graphql/types/classrooms-module';

@Resolver(() => ClassroomsModule)
export class ClassroomsModuleReferenceResolver {
  constructor(
    private readonly classroomsModulesLoader: ClassroomsModulesLoader
  ) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.classroomsModulesLoader.findByIds.load(reference.id);
  }
}
