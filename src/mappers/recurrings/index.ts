import {
  cleanObject,
  cleanSortValue,
  cleanValue,
  cleanValueNumber,
  cleanWhere,
  cleanWhereDataNumber,
  cleanWhereDataString,
  IWhere,
  PrismaMapper,
  splitServiceId
} from '@stokei/nestjs';

import {
  FindAllRecurringsDTO,
  WhereDataFindAllRecurringsDTO
} from '@/dtos/recurrings/find-all-recurrings.dto';
import { RecurringEntity } from '@/entities';
import { RecurringModel } from '@/models/recurring.model';
import { FindAllRecurringsQuery } from '@/queries/implements/recurrings/find-all-recurrings.query';

export class RecurringMapper {
  toWhereFindAllPrisma(where: IWhere<WhereDataFindAllRecurringsDTO>) {
    const prismaMapper = new PrismaMapper();
    return prismaMapper.toWhere({
      data: where,
      allowIsEmptyValues: {
        NOT: true
      },
      operatorMapper(operatorData) {
        return {
          id: prismaMapper.toWhereIds(operatorData.ids),
          app: prismaMapper.toWhereData(operatorData.app),
          usageType: operatorData.usageType,
          intervalCount: prismaMapper.toWhereData(operatorData.intervalCount),
          interval: operatorData.interval,
          updatedBy: prismaMapper.toWhereData(operatorData.updatedBy),
          createdBy: prismaMapper.toWhereData(operatorData.createdBy)
        };
      }
    });
  }
  toFindAllPrisma(data: FindAllRecurringsDTO) {
    const prismaMapper = new PrismaMapper();
    const orderBy = prismaMapper.toOrderBy(cleanObject(data?.orderBy));
    return {
      where: this.toWhereFindAllPrisma(data?.where),
      orderBy,
      ...prismaMapper.toPagination({ page: data?.page })
    };
  }
  toFindAllQueryClean(query: FindAllRecurringsQuery): FindAllRecurringsQuery {
    if (!query) {
      return null;
    }
    return {
      ...query,
      where: cleanWhere({
        data: query?.where,
        operatorMapper(operatorData) {
          return {
            usageType: operatorData.usageType,
            intervalCount: cleanWhereDataNumber(operatorData.intervalCount),
            interval: operatorData.interval,
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
        usageType: cleanSortValue(query.orderBy?.usageType),
        intervalCount: cleanSortValue(query.orderBy?.intervalCount),
        interval: cleanSortValue(query.orderBy?.interval),
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      })
    };
  }
  toModel(recurring: RecurringEntity) {
    return recurring && new RecurringModel(recurring);
  }
  toModels(recurrings: RecurringEntity[]) {
    return recurrings?.length > 0
      ? recurrings.map(this.toModel).filter(Boolean)
      : [];
  }
}
