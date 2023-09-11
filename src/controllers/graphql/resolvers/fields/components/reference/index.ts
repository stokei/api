import { Resolver, ResolveReference } from '@nestjs/graphql';

import { ComponentsLoader } from '@/controllers/graphql/dataloaders/components.loader';
import { Component } from '@/controllers/graphql/types/component';

@Resolver(() => Component)
export class ComponentReferenceResolver {
  constructor(private readonly componentsLoader: ComponentsLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.componentsLoader.findByIds.load(reference.id);
  }
}
