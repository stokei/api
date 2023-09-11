import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { App } from '@/controllers/graphql/types/app';
import { Component } from '@/controllers/graphql/types/component';
import { ComponentModel } from '@/models/component.model';

@Resolver(() => Component)
export class ComponentAppResolver {
  constructor(private readonly appsLoader: AppsLoader) {}

  @ResolveField(() => App, { nullable: true })
  app(@Parent() component: ComponentModel) {
    return component.app && this.appsLoader.findByIds.load(component.app);
  }
}
