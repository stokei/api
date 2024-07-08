import { Resolver, ResolveReference } from '@nestjs/graphql';

import { PluginsLoader } from '@/controllers/graphql/dataloaders/plugins.loader';
import { Plugin } from '@/controllers/graphql/types/plugin';

@Resolver(() => Plugin)
export class PluginReferenceResolver {
  constructor(private readonly pluginsLoader: PluginsLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.pluginsLoader.findByIds.load(reference.id);
  }
}
