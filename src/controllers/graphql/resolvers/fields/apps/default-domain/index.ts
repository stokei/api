import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { createServiceId } from '@stokei/nestjs';

import { DomainStatus } from '@/controllers/graphql/enums/domain-status.enum';
import { App } from '@/controllers/graphql/types/app';
import { Domain } from '@/controllers/graphql/types/domain';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { AppModel } from '@/models/app.model';
import { DomainModel } from '@/models/domain.model';
import { FindAppCurrentDomainService } from '@/services/apps/find-app-current-domain';
import { getDefaultAppDomain } from '@/utils/get-default-app-domain';

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
    return new DomainModel({
      id: createServiceId({
        id: 'app-domain-default',
        service: ServerStokeiApiIdPrefix.DOMAINS
      }),
      app: app.id,
      parent: app.id,
      name: getDefaultAppDomain({ appId: app.id }),
      status: DomainStatus.ACTIVE,
      active: true,
      createdBy: app.parent
    });
  }
}
