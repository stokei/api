import { UseGuards } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { Account } from '@/controllers/graphql/types/account';
import { AccountModel } from '@/models/account.model';
import { FindAllAppInstructorsService } from '@/services/app-instructors/find-all-app-instructors';
import { GetOrSetCacheService } from '@/services/cache/get-or-set-cache';

@Resolver(() => Account)
export class AccountIsInstructorResolver {
  constructor(
    private readonly findAllAppInstructorsService: FindAllAppInstructorsService,
    private readonly getOrSetCacheService: GetOrSetCacheService
  ) {}

  @UseGuards(AppGuard)
  @ResolveField(() => Boolean, { nullable: true })
  async isInstructor(
    @Parent() account: AccountModel,
    @CurrentApp('id') appId: string
  ) {
    const instructors = await this.getOrSetCacheService.execute(
      account?.id + account?.app + AccountIsInstructorResolver.name,
      () =>
        this.findAllAppInstructorsService.execute({
          where: {
            AND: {
              instructor: {
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
    return instructors?.totalCount > 0;
  }
}
