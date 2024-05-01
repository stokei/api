import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { Component } from '@/controllers/graphql/types/component';
import { ComponentModel } from '@/models/component.model';

@Resolver(() => Component)
export class ComponentCreatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  createdBy(@Parent() component: ComponentModel) {
    return (
      component.createdBy &&
      this.accountsLoader.findByIds.load(component.createdBy)
    );
  }
}
