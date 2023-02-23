import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { MeAccount } from '@/controllers/graphql/types/me-account';
import { AccountModel } from '@/models/account.model';
import { FindAllAppInstructorsService } from '@/services/app-instructors/find-all-app-instructors';
import { GetOrSetCacheService } from '@/services/cache/get-or-set-cache';

@Resolver(() => MeAccount)
export class MeAccountIsInstructorResolver {
  constructor(
    private readonly findAllAppInstructorsService: FindAllAppInstructorsService,
    private readonly getOrSetCacheService: GetOrSetCacheService
  ) {}

  @ResolveField(() => Boolean, { nullable: true })
  async isInstructor(@Parent() account: AccountModel) {
    const instructors = await this.getOrSetCacheService.execute(
      account?.id + account?.app,
      () =>
        this.findAllAppInstructorsService.execute({
          where: {
            AND: {
              instructor: {
                equals: account?.id
              },
              app: {
                equals: account?.app
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
