import { Args, Query, Resolver } from '@nestjs/graphql';

import { AddressesLoader } from '@/controllers/graphql/dataloaders/addresses.loader';
import { Address } from '@/controllers/graphql/types/address';
import { AddressNotFoundException, ParamNotFoundException } from '@/errors';

@Resolver(() => Address)
export class AddressResolver {
  constructor(private readonly addressesLoader: AddressesLoader) {}

  @Query(() => Address)
  async address(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const address = await this.addressesLoader.findByIds.load(id);
    if (!address) {
      throw new AddressNotFoundException();
    }
    return address;
  }
}
