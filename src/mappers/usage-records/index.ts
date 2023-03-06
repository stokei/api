import {
  cleanObject,
  cleanSortValue,
  cleanValue,
  cleanValueNumber,
  cleanWhere,
  cleanWhereDataSearch,
  cleanWhereDataString,
  IWhere,
  PrismaMapper,
  splitServiceId
} from '@stokei/nestjs';
import Stripe from 'stripe';

import {
  FindAllUsageRecordsDTO,
  WhereDataFindAllUsageRecordsDTO
} from '@/dtos/usage-records/find-all-usage-records.dto';
import { UsageRecordEntity } from '@/entities';
import { UsageRecordAction } from '@/enums/usage-record-action.enum';
import { UsageRecordModel } from '@/models/usage-record.model';
import { FindAllUsageRecordsQuery } from '@/queries/implements/usage-records/find-all-usage-records.query';

export class UsageRecordMapper {
  toWhereFindAllPrisma(where: IWhere<WhereDataFindAllUsageRecordsDTO>) {
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
          app: prismaMapper.toWhereData(operatorData.app),
          action: operatorData.action,
          updatedBy: prismaMapper.toWhereData(operatorData.updatedBy),
          createdBy: prismaMapper.toWhereData(operatorData.createdBy)
        };
      }
    });
  }
  toFindAllPrisma(data: FindAllUsageRecordsDTO) {
    const prismaMapper = new PrismaMapper();
    const orderBy = prismaMapper.toOrderBy(cleanObject(data?.orderBy));
    return {
      where: this.toWhereFindAllPrisma(data?.where),
      orderBy,
      ...prismaMapper.toPagination({ page: data?.page })
    };
  }
  toFindAllQueryClean(
    query: FindAllUsageRecordsQuery
  ): FindAllUsageRecordsQuery {
    if (!query) {
      return null;
    }
    return {
      ...query,
      where: cleanWhere({
        data: query?.where,
        allowIsEmptyValues: {
          NOT: true
        },
        operatorMapper(operatorData) {
          return {
            parent: cleanWhereDataSearch(operatorData.parent),
            action: operatorData.action,
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
        quantity: cleanSortValue(query.orderBy?.quantity),
        action: cleanSortValue(query.orderBy?.action),
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      })
    };
  }
  toModel(usageRecord: UsageRecordEntity) {
    return usageRecord && new UsageRecordModel(usageRecord);
  }
  toModels(usageRecords: UsageRecordEntity[]) {
    return usageRecords?.length > 0
      ? usageRecords.map(this.toModel).filter(Boolean)
      : [];
  }
  actionToStripeAction(
    action: UsageRecordAction
  ): Stripe.UsageRecordCreateParams.Action {
    const actions: Record<
      UsageRecordAction,
      Stripe.UsageRecordCreateParams.Action
    > = {
      [UsageRecordAction.SET]: 'set',
      [UsageRecordAction.INCREMENT]: 'increment'
    };
    return actions[action] || actions[UsageRecordAction.INCREMENT];
  }
}
