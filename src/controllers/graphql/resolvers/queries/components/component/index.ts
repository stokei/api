import { Args, Query, Resolver } from '@nestjs/graphql';

import { ComponentsLoader } from '@/controllers/graphql/dataloaders/components.loader';
import { Component } from '@/controllers/graphql/types/component';
import { ComponentNotFoundException, ParamNotFoundException } from '@/errors';

@Resolver(() => Component)
export class ComponentResolver {
  constructor(private readonly componentsLoader: ComponentsLoader) {}

  @Query(() => Component)
  async component(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const component = await this.componentsLoader.findByIds.load(id);
    if (!component) {
      throw new ComponentNotFoundException();
    }
    return component;
  }
}
