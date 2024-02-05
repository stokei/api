import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { OrderBy } from '@stokei/nestjs';

import { MeAccount } from '@/controllers/graphql/types/me-account';
import { Phone } from '@/controllers/graphql/types/phone';
import { AccountModel } from '@/models/account.model';
import { FindAllPhonesService } from '@/services/phones/find-all-phones';

@Resolver(() => MeAccount)
export class MeAccountPhoneResolver {
  constructor(private readonly findAllPhonesService: FindAllPhonesService) {}

  @ResolveField(() => Phone, { nullable: true })
  async phone(@Parent() account: AccountModel) {
    try {
      const phones = await this.findAllPhonesService.execute({
        page: {
          limit: 1
        },
        orderBy: {
          createdAt: OrderBy.DESC
        },
        where: {
          AND: {
            parent: {
              equals: account.id
            }
          }
        }
      });

      return phones?.items?.[0];
    } catch (error) {
      return;
    }
  }
}
