import { Resolver, ResolveReference } from '@nestjs/graphql';

import { ModulesMaterialsLoader } from '@/controllers/graphql/dataloaders/modules-materials.loader';
import { ModulesMaterial } from '@/controllers/graphql/types/modules-material';

@Resolver(() => ModulesMaterial)
export class ModulesMaterialReferenceResolver {
  constructor(
    private readonly modulesMaterialsLoader: ModulesMaterialsLoader
  ) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.modulesMaterialsLoader.findByIds.load(reference.id);
  }
}
