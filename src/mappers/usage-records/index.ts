import {
  cleanObject,
  cleanSortValue,
  cleanValue,
  cleanValueNumber,
  cleanWhereDataSearch,
  cleanWhereDataString,
  IOperator,
  IWhere,
  PrismaMapper,
  splitServiceId
} from '@stokei/nestjs';

import {
  FindAllUsageRecordsDTO,
  WhereDataFindAllUsageRecordsDTO
} from '@/dtos/usage-records/find-all-usage-records.dto';
import { UsageRecordEntity } from '@/entities';
import { UsageRecordModel } from '@/models/usage-record.model';
import { FindAllUsageRecordsQuery } from '@/queries/implements/usage-records/find-all-usage-records.query';

export class UsageRecordMapper {
  toWhereFindAllPrisma(where: IWhere<WhereDataFindAllUsageRecordsDTO>) {
    const prismaMapper = new PrismaMapper();
    const mapFromDTOOperatorDataToPrismaOperatorData = (
      operator: IOperator
    ) => {
      const operatorData = where?.[operator];
      if (!operatorData) {
        return null;
      }
      return {
        id: prismaMapper.toWhereIds(operatorData.ids),
        parent: prismaMapper.toWhereDataSearch(operatorData.parent),
        app: prismaMapper.toWhereData(operatorData.app),
        action: operatorData.action,
        updatedBy: prismaMapper.toWhereData(operatorData.updatedBy),
        createdBy: prismaMapper.toWhereData(operatorData.createdBy)
      };
    };
    return prismaMapper.toWhere({
      AND: mapFromDTOOperatorDataToPrismaOperatorData('AND'),
      OR: mapFromDTOOperatorDataToPrismaOperatorData('OR'),
      NOT: mapFromDTOOperatorDataToPrismaOperatorData('NOT')
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
    const clearWhereOperatorData = (operator: IOperator) => {
      const operatorData = query?.where?.[operator];
      if (!operatorData) {
        return null;
      }
      return {
        [operator]: {
          parent: cleanWhereDataSearch(operatorData.parent),
          action: operatorData.action,
          app: cleanWhereDataString(operatorData.app),
          updatedBy: cleanWhereDataString(operatorData.updatedBy),
          createdBy: cleanWhereDataString(operatorData.createdBy),
          ids:
            operatorData.ids?.length > 0
              ? operatorData.ids.map((id) => splitServiceId(cleanValue(id))?.id)
              : undefined
        }
      };
    };
    return {
      ...query,
      where: {
        ...cleanObject(clearWhereOperatorData('AND')),
        ...cleanObject(clearWhereOperatorData('OR')),
        ...cleanObject(clearWhereOperatorData('NOT'), true)
      },
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
}
