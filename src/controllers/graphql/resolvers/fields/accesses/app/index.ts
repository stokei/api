import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Access } from '@/controllers/graphql/types/access';
import { App } from '@/controllers/graphql/types/app';
import { AccessModel } from '@/models/access.model';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';

@Resolver(() => Access)
export class AccessAppResolver {
  constructor(private readonly findAppByIdService: FindAppByIdService) {}

  @ResolveField(() => App)
  app(@Parent() access: AccessModel) {
    return this.findAppByIdService.execute(access.app);
  }
}
