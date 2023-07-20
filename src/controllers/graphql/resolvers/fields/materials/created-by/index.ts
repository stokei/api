import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { Material } from '@/controllers/graphql/types/material';
import { MaterialModel } from '@/models/material.model';

@Resolver(() => Material)
export class MaterialCreatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  createdBy(@Parent() material: MaterialModel) {
    return (
      material.createdBy &&
      this.accountsLoader.findByIds.load(material.createdBy)
    );
  }
}
