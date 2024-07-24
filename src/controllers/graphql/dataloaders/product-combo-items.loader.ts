import { Injectable, Scope } from '@nestjs/common';
import { PaginationMapper } from '@stokei/nestjs';
import DataLoader from 'dataloader';

import { ProductComboItemModel } from '@/models/product-combo-item.model';
import { FindAllProductComboItemsService } from '@/services/product-combo-items/find-all-product-combo-items';

@Injectable({ scope: Scope.REQUEST })
export class ProductComboItemsLoader {
  constructor(
    private readonly productComboItemsService: FindAllProductComboItemsService
  ) {}

  readonly findByIds = new DataLoader(async (productComboItemIds: string[]) => {
    const productComboItems = await this.productComboItemsService.execute({
      where: {
        AND: {
          ids: productComboItemIds
        }
      }
    });
    const productComboItemsMap = new Map(
      productComboItems?.items?.map((productComboItem) => [
        productComboItem.id,
        productComboItem
      ])
    );
    return productComboItemIds.map((productComboItemId) =>
      productComboItemsMap.get(productComboItemId)
    );
  });

  readonly findByParentIds = new DataLoader(
    async (productComboItemParentIds: string[]) => {
      const productComboItems = await this.productComboItemsService.execute({
        where: {
          AND: {
            parent: {
              equals: productComboItemParentIds
            }
          }
        }
      });
      return productComboItemParentIds.map((parentId) => {
        const items = productComboItems?.items?.filter(
          (productComboItem) => productComboItem.parent === parentId
        );
        return new PaginationMapper<ProductComboItemModel>().toPaginationList({
          totalCount: items?.length || 0,
          items
        });
      });
    }
  );

  readonly findByProductIds = new DataLoader(
    async (productComboItemProductIds: string[]) => {
      const productComboItems = await this.productComboItemsService.execute({
        where: {
          AND: {
            product: {
              equals: productComboItemProductIds
            }
          }
        }
      });
      return productComboItemProductIds.map((productId) => {
        const items = productComboItems?.items?.filter(
          (productComboItem) => productComboItem.product === productId
        );
        return new PaginationMapper<ProductComboItemModel>().toPaginationList({
          totalCount: items?.length || 0,
          items
        });
      });
    }
  );
}
