import { Resolver, ResolveReference } from '@nestjs/graphql';
import { AddressesLoader } from '@/controllers/graphql/dataloaders/addresses.loader';
import { Address } from '@/controllers/graphql/types/address';

@Resolver(() => Address)
export class AddressReferenceResolver {
  constructor(private readonly addressesLoader: AddressesLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.addressesLoader.findByIds.load(reference.id);
  }
}
