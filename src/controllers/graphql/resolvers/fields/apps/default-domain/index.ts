import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { App } from '@/controllers/graphql/types/app';
import { Domain } from '@/controllers/graphql/types/domain';
import { AppModel } from '@/models/app.model';
import { FindAppCurrentDomainService } from '@/services/apps/find-app-current-domain';

@Resolver(() => App)
export class AppDefaultDomainResolver {
  constructor(
    private readonly findAppCurrentDomainService: FindAppCurrentDomainService
  ) {}

  @ResolveField(() => Domain, { nullable: true })
  defaultDomain(@Parent() app: AppModel) {
    return this.findAppCurrentDomainService.execute(app.id);
  }
}
