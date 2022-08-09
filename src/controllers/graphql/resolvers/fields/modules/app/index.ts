import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Module } from '@/controllers/graphql/types/module';
import { ModuleModel } from '@/models/module.model';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';

@Resolver(() => Module)
export class ModuleAppResolver {
  constructor(private readonly findAppByIdService: FindAppByIdService) {}

  @ResolveField(() => Module)
  app(@Parent() module: ModuleModel) {
    return this.findAppByIdService.execute(module.app);
  }
}
