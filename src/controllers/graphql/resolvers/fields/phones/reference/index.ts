import { Resolver, ResolveReference } from '@nestjs/graphql';

import { PhonesLoader } from '@/controllers/graphql/dataloaders/phones.loader';
import { Phone } from '@/controllers/graphql/types/phone';

@Resolver(() => Phone)
export class PhoneReferenceResolver {
  constructor(private readonly phonesLoader: PhonesLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.phonesLoader.findByIds.load(reference.id);
  }
}
