import {
  cleanObject,
  cleanSortValue,
  cleanValue,
  cleanValueNumber,
  cleanWhere,
  cleanWhereDataBoolean,
  cleanWhereDataSearch,
  cleanWhereDataString,
  IWhere,
  PrismaMapper,
  splitServiceId
} from '@stokei/nestjs';
import Stripe from 'stripe';

import {
  FindAllPricesDTO,
  WhereDataFindAllPricesDTO
} from '@/dtos/prices/find-all-prices.dto';
import { PriceEntity } from '@/entities';
import { BillingScheme } from '@/enums/billing-scheme.enum';
import { TiersMode } from '@/enums/tiers-mode.enum';
import { PriceModel } from '@/models/price.model';
import { FindAllPricesQuery } from '@/queries/implements/prices/find-all-prices.query';

export class PriceMapper {
  toWhereFindAllPrisma(where: IWhere<WhereDataFindAllPricesDTO>) {
    const prismaMapper = new PrismaMapper();
    return prismaMapper.toWhere({
      data: where,
      allowIsEmptyValues: {
        NOT: true
      },
      operatorMapper(operatorData) {
        return {
          id: prismaMapper.toWhereIds(operatorData.ids),
          parent: prismaMapper.toWhereDataSearch(operatorData.parent),
          currency: prismaMapper.toWhereData(operatorData.currency),
          unit: prismaMapper.toWhereData(operatorData.unit),
          active: prismaMapper.toWhereData(operatorData.active),
          automaticRenew: prismaMapper.toWhereData(operatorData.automaticRenew),
          type: operatorData.type,
          inventoryType: operatorData.inventoryType,
          billingScheme: operatorData.billingScheme,
          tiersMode: operatorData.tiersMode,
          app: prismaMapper.toWhereData(operatorData.app),
          updatedBy: prismaMapper.toWhereData(operatorData.updatedBy),
          createdBy: prismaMapper.toWhereData(operatorData.createdBy)
        };
      }
    });
  }
  toFindAllPrisma(data: FindAllPricesDTO) {
    const prismaMapper = new PrismaMapper();
    const orderBy = prismaMapper.toOrderBy(cleanObject(data?.orderBy));
    return {
      where: this.toWhereFindAllPrisma(data?.where),
      orderBy,
      ...prismaMapper.toPagination({ page: data?.page })
    };
  }
  toFindAllQueryClean(query: FindAllPricesQuery): FindAllPricesQuery {
    if (!query) {
      return null;
    }
    return {
      ...query,
      where: cleanWhere({
        data: query?.where,
        operatorMapper(operatorData) {
          return {
            parent: cleanWhereDataSearch(operatorData.parent),
            currency: cleanWhereDataString(operatorData.currency),
            unit: cleanWhereDataString(operatorData.unit),
            active: cleanWhereDataBoolean(operatorData.active),
            automaticRenew: cleanWhereDataBoolean(operatorData.automaticRenew),
            type: operatorData.type,
            inventoryType: operatorData.inventoryType,
            billingScheme: operatorData.billingScheme,
            tiersMode: operatorData.tiersMode,
            app: cleanWhereDataString(operatorData.app),
            updatedBy: cleanWhereDataString(operatorData.updatedBy),
            createdBy: cleanWhereDataString(operatorData.createdBy),
            ids:
              operatorData.ids?.length > 0
                ? operatorData.ids.map(
                    (id) => splitServiceId(cleanValue(id))?.id
                  )
                : undefined
          };
        }
      }),
      page: cleanObject({
        limit: cleanValueNumber(query.page?.limit),
        number: cleanValueNumber(query.page?.number)
      }),
      orderBy: cleanObject({
        amount: cleanSortValue(query.orderBy?.amount),
        currency: cleanSortValue(query.orderBy?.currency),
        automaticRenew: cleanSortValue(query.orderBy?.automaticRenew),
        unit: cleanSortValue(query.orderBy?.unit),
        fromAmount: cleanSortValue(query.orderBy?.fromAmount),
        type: cleanSortValue(query.orderBy?.type),
        inventoryType: cleanSortValue(query.orderBy?.inventoryType),
        billingScheme: cleanSortValue(query.orderBy?.billingScheme),
        tiersMode: cleanSortValue(query.orderBy?.tiersMode),
        quantity: cleanSortValue(query.orderBy?.quantity),
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      })
    };
  }
  toModel(price: PriceEntity) {
    return price && new PriceModel(price);
  }
  toModels(prices: PriceEntity[]) {
    return prices?.length > 0 ? prices.map(this.toModel).filter(Boolean) : [];
  }
  billingSchemeToStripeBillingScheme(
    billingScheme: BillingScheme
  ): Stripe.Price.BillingScheme {
    const billingSchemes: Record<
      BillingScheme,
      Stripe.PriceCreateParams.BillingScheme
    > = {
      [BillingScheme.PER_UNIT]: 'per_unit',
      [BillingScheme.TIERED]: 'tiered'
    };
    return (
      billingSchemes[billingScheme] || billingSchemes[BillingScheme.PER_UNIT]
    );
  }
  tiersModeToStripeTiersMode(tiersMode: TiersMode): Stripe.Price.TiersMode {
    const tiersModes: Record<TiersMode, Stripe.PriceCreateParams.TiersMode> = {
      [TiersMode.VOLUME]: 'volume'
    };
    return tiersModes[tiersMode] || tiersModes[TiersMode.VOLUME];
  }
}
