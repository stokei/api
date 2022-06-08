import { Resolver, ResolveReference } from '@nestjs/graphql';
import { ModulesLoader } from '@/controllers/graphql/dataloaders/modules.loader';
import { Module } from '@/controllers/graphql/types/module';

@Resolver(() => Module)
export class ModuleReferenceResolver {
  constructor(private readonly modulesLoader: ModulesLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.modulesLoader.findByIds.load(reference.id);
  }
}
