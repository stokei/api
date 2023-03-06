import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { App } from '@/controllers/graphql/types/app';
import { Role } from '@/controllers/graphql/types/role';
import { RoleModel } from '@/models/role.model';

@Resolver(() => Role)
export class RoleAppResolver {
  constructor(private readonly appsLoader: AppsLoader) {}

  @ResolveField(() => App, { nullable: true })
  app(@Parent() role: RoleModel) {
    return role.app && this.appsLoader.findByIds.load(role.app);
  }
}
