import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { App } from '@/controllers/graphql/types/app';
import { Domain } from '@/controllers/graphql/types/domain';
import { AppModel } from '@/models/app.model';
import { FindAppCurrentDomainService } from '@/services/apps/find-app-current-domain';
import { getAppStokeiDomain } from '@/utils/get-app-stokei-domain';

@Resolver(() => App)
export class AppDefaultDomainResolver {
  constructor(
    private readonly findAppCurrentDomainService: FindAppCurrentDomainService
  ) {}

  @ResolveField(() => Domain, { nullable: true })
  async defaultDomain(@Parent() app: AppModel) {
    const appDomain = await this.findAppCurrentDomainService.execute(app.id);
    if (appDomain) {
      return appDomain;
    }
    return getAppStokeiDomain({
      app
    });
  }
}