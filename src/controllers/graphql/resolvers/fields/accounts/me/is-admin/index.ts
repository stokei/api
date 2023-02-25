import { UseGuards } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { MeAccount } from '@/controllers/graphql/types/me-account';
import { AccountModel } from '@/models/account.model';
import { FindAllAppAdminsService } from '@/services/app-admins/find-all-app-admins';
import { GetOrSetCacheService } from '@/services/cache/get-or-set-cache';

@Resolver(() => MeAccount)
export class MeAccountIsAdminResolver {
  constructor(
    private readonly findAllAppAdminsService: FindAllAppAdminsService,
    private readonly getOrSetCacheService: GetOrSetCacheService
  ) {}

  @UseGuards(AppGuard)
  @ResolveField(() => Boolean, { nullable: true })
  async isAdmin(
    @Parent() account: AccountModel,
    @CurrentApp('id') appId: string
  ) {
    const admins = await this.getOrSetCacheService.execute(
      account?.id + account?.app + MeAccountIsAdminResolver.name,
      () =>
        this.findAllAppAdminsService.execute({
          where: {
            AND: {
              admin: {
                equals: account?.id
              },
              app: {
                equals: appId
              }
            }
          },
          page: {
            limit: 1
          }
        })
    );
    return admins?.totalCount > 0;
  }
}
