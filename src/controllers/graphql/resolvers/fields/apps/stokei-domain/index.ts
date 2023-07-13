import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { App } from '@/controllers/graphql/types/app';
import { Domain } from '@/controllers/graphql/types/domain';
import { AppModel } from '@/models/app.model';
import { getAppStokeiDomain } from '@/utils/get-app-stokei-domain';

@Resolver(() => App)
export class AppStokeiDomainResolver {
  @ResolveField(() => Domain, { nullable: true })
  async stokeiDomain(@Parent() app: AppModel) {
    return getAppStokeiDomain({
      app
    });
  }
}
