import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { App } from '@/controllers/graphql/types/app';
import { Balance } from '@/controllers/graphql/types/balance';
import { AppModel } from '@/models/app.model';
import { FindAppBalancesService } from '@/services/apps/find-app-balances';

@Resolver(() => App)
export class AppBalancesResolver {
  constructor(
    private readonly findAppBalancesService: FindAppBalancesService
  ) {}

  @ResolveField(() => Balance, { nullable: true })
  async balances(@Parent() app: AppModel) {
    return await this.findAppBalancesService.execute({ app: app.id });
  }
}
