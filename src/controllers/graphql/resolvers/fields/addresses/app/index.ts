import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { Address } from '@/controllers/graphql/types/address';
import { App } from '@/controllers/graphql/types/app';
import { AddressModel } from '@/models/address.model';

@Resolver(() => Address)
export class AddressAppResolver {
  constructor(private readonly appsLoader: AppsLoader) {}

  @ResolveField(() => App)
  app(@Parent() address: AddressModel) {
    return address.app && this.appsLoader.findByIds.load(address.app);
  }
}
