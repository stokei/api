import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanDate, cleanObject, cleanValue } from '@stokei/nestjs';

import {
  DataNotFoundException,
  ParamNotFoundException,
  ProductsNotFoundException
} from '@/errors';
import { ProductBestSellerModel } from '@/models/product-best-seller.model';
import { FindProductsBestSellerByPeriodQuery } from '@/queries/implements/products/find-products-best-seller-by-period.query';
import { FindProductsBestSellerByPeriodRepository } from '@/repositories/products/find-products-best-seller-by-period';
import { FindAllProductsService } from '@/services/products/find-all-products';

type KeysFindProductsBestSellerByPeriodQuery =
  keyof FindProductsBestSellerByPeriodQuery;

@QueryHandler(FindProductsBestSellerByPeriodQuery)
export class FindProductsBestSellerByPeriodQueryHandler
  implements IQueryHandler<FindProductsBestSellerByPeriodQuery>
{
  constructor(
    private readonly findAllProductsService: FindAllProductsService,
    private readonly findProductsBestSellerByPeriodRepository: FindProductsBestSellerByPeriodRepository
  ) {}

  async execute(
    query: FindProductsBestSellerByPeriodQuery
  ): Promise<ProductBestSellerModel[]> {
    const data = this.clearData(query);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.app) {
      throw new ParamNotFoundException<KeysFindProductsBestSellerByPeriodQuery>(
        'app'
      );
    }
    if (!data.startAt) {
      throw new ParamNotFoundException<KeysFindProductsBestSellerByPeriodQuery>(
        'startAt'
      );
    }
    if (!data.endAt) {
      throw new ParamNotFoundException<KeysFindProductsBestSellerByPeriodQuery>(
        'endAt'
      );
    }
    const productBestSellers =
      await this.findProductsBestSellerByPeriodRepository.execute(data);
    const productsIds = productBestSellers.map(({ product }) => product);
    const products = await this.findAllProductsService.execute({
      where: {
        AND: {
          ids: productsIds
        }
      }
    });
    if (!products?.totalCount) {
      throw new ProductsNotFoundException();
    }

    return (
      productBestSellers
        .map((productBestSellerItem) => {
          const product = products?.items?.find(
            (productItem) => productItem.id === productBestSellerItem.product
          );
          if (!product) {
            return;
          }
          return new ProductBestSellerModel({
            quantity: productBestSellerItem.quantity,
            product
          });
        })
        ?.filter(Boolean) || []
    );
  }

  private clearData(
    data: FindProductsBestSellerByPeriodQuery
  ): FindProductsBestSellerByPeriodQuery {
    return cleanObject({
      app: cleanValue(data.app),
      startAt: cleanDate(data.startAt),
      endAt: cleanDate(data.endAt)
    });
  }
}
