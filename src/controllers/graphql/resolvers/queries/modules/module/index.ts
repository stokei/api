import { Args, Query, Resolver } from '@nestjs/graphql';

import { ModulesLoader } from '@/controllers/graphql/dataloaders/modules.loader';
import { Module } from '@/controllers/graphql/types/module';
import { ModuleNotFoundException, ParamNotFoundException } from '@/errors';

@Resolver(() => Module)
export class ModuleResolver {
  constructor(private readonly modulesLoader: ModulesLoader) {}

  @Query(() => Module)
  async module(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const module = await this.modulesLoader.findByIds.load(id);
    if (!module) {
      throw new ModuleNotFoundException();
    }
    return module;
  }
}
