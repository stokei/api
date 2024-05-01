import { Args, Query, Resolver } from '@nestjs/graphql';

import { VersionsLoader } from '@/controllers/graphql/dataloaders/versions.loader';
import { Version } from '@/controllers/graphql/types/version';
import { ParamNotFoundException, VersionNotFoundException } from '@/errors';

@Resolver(() => Version)
export class VersionResolver {
  constructor(private readonly versionsLoader: VersionsLoader) {}

  @Query(() => Version)
  async version(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const version = await this.versionsLoader.findByIds.load(id);
    if (!version) {
      throw new VersionNotFoundException();
    }
    return version;
  }
}
