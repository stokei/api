import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { Component } from '@/controllers/graphql/types/component';
import { ComponentModel } from '@/models/component.model';

@Resolver(() => Component)
export class ComponentUpdatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  updatedBy(@Parent() component: ComponentModel) {
    return (
      component.updatedBy &&
      this.accountsLoader.findByIds.load(component.updatedBy)
    );
  }
}
