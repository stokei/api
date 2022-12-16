import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import {
  DataNotFoundException,
  ParamNotFoundException,
  PlanNotFoundException,
  PriceNotFoundException,
  ProductNotFoundException
} from '@/errors';
import { PriceModel } from '@/models/price.model';
import { FindPlanPriceByTypeQuery } from '@/queries/implements/plans/find-plan-price-by-type.query';
import { FindAllPlansService } from '@/services/plans/find-all-plans';
import { FindAllPricesService } from '@/services/prices/find-all-prices';
import { FindAllProductsService } from '@/services/products/find-all-products';

@QueryHandler(FindPlanPriceByTypeQuery)
export class FindPlanPriceByTypeQueryHandler
  implements IQueryHandler<FindPlanPriceByTypeQuery>
{
  constructor(
    private readonly findAllPlansService: FindAllPlansService,
    private readonly findAllPricesService: FindAllPricesService,
    private readonly findAllProductsService: FindAllProductsService
  ) {}

  async execute(query: FindPlanPriceByTypeQuery): Promise<PriceModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const type = query.type;
    if (!type) {
      throw new ParamNotFoundException('planType');
    }
    const plans = await this.findAllPlansService.execute({
      where: {
        AND: {
          type
        }
      },
      page: {
        limit: 1
      }
    });
    const plan = plans?.items?.[0];
    if (!plan) {
      throw new PlanNotFoundException();
    }

    const products = await this.findAllProductsService.execute({
      where: {
        AND: {
          app: {
            equals: plan.app
          },
          parent: {
            equals: plan.id
          }
        }
      },
      page: {
        limit: 1
      }
    });
    const product = products?.items?.[0];
    if (!product) {
      throw new ProductNotFoundException();
    }

    const prices = await this.findAllPricesService.execute({
      where: {
        AND: {
          app: {
            equals: product.app
          },
          parent: {
            equals: product.id
          },
          default: {
            equals: true
          }
        }
      },
      page: {
        limit: 1
      }
    });
    const price = prices?.items?.[0];
    if (!price) {
      throw new PriceNotFoundException();
    }
    return price;
  }
}
