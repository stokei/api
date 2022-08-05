import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Address } from '@/controllers/graphql/types/address';
import { AddressModel } from '@/models/address.model';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';

@Resolver(() => Address)
export class AddressAppResolver {
  constructor(private readonly findAppByIdService: FindAppByIdService) {}

  @ResolveField(() => Address)
  app(@Parent() address: AddressModel) {
    return this.findAppByIdService.execute(address.app);
  }
}
