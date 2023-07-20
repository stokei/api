import { Resolver, ResolveReference } from '@nestjs/graphql';

import { MaterialsLoader } from '@/controllers/graphql/dataloaders/materials.loader';
import { Material } from '@/controllers/graphql/types/material';

@Resolver(() => Material)
export class MaterialReferenceResolver {
  constructor(private readonly materialsLoader: MaterialsLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.materialsLoader.findByIds.load(reference.id);
  }
}
