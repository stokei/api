import { createUnionType, Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { splitServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';

import { Account } from './account';
import { App } from './app';
import { Catalog } from './catalog';
import { CatalogItem } from './catalog-item';
import { Hero } from './hero';

export const SortedItemUnion = createUnionType({
  name: 'SortedItemUnion',
  types: () => [Catalog, CatalogItem, Hero] as const,
  async resolveType(value) {
    const type = splitServiceId(value?.id)?.service;
    const types = {
      [ServerStokeiApiIdPrefix.CATALOGS]: Catalog.name,
      [ServerStokeiApiIdPrefix.CATALOG_ITEMS]: CatalogItem.name,
      [ServerStokeiApiIdPrefix.HEROS]: Hero.name
    };
    return types[type];
  }
});

@ObjectType()
export class SortedItem {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: true })
  parent: string;

  @Field(() => Int, { nullable: true })
  index: number;

  @Field(() => SortedItemUnion, { nullable: true })
  item: typeof SortedItemUnion;

  @Field(() => String, { nullable: true })
  updatedAt?: string;

  @Field(() => String, { nullable: true })
  createdAt?: string;

  @Field(() => Account, { nullable: true })
  updatedBy?: Account;

  @Field(() => Account, { nullable: true })
  createdBy?: Account;

  @Field(() => App, { nullable: true })
  app?: App;
}
