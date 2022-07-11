import { Resolver, ResolveReference } from '@nestjs/graphql';

import { ClassroomModulesLoader } from '@/controllers/graphql/dataloaders/classroom-module s.loader';
import { ClassroomModule } from '@/controllers/graphql/types/classroom-module ';

@Resolver(() => ClassroomModule)
export class ClassroomModuleReferenceResolver {
  constructor(
    private readonly classroomModulesLoader: ClassroomModulesLoader
  ) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.classroomModulesLoader.findByIds.load(reference.id);
  }
}
