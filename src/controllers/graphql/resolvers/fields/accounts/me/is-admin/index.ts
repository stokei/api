import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { MeAccount } from '@/controllers/graphql/types/me-account';
import { AccountModel } from '@/models/account.model';
import { FindAllAppAdminsService } from '@/services/app-admins/find-all-app-admins';

@Resolver(() => MeAccount)
export class MeAccountIsAdminResolver {
  constructor(
    private readonly findAllAppAdminsService: FindAllAppAdminsService
  ) {}

  @ResolveField(() => Boolean, { nullable: true })
  async isAdmin(@Parent() account: AccountModel) {
    const admins = await this.findAllAppAdminsService.execute({
      where: {
        AND: {
          admin: {
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
    });
    return admins?.totalCount > 0;
  }
}
