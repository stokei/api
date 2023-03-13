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

import {
  FindAllSortedItemsDTO,
  WhereDataFindAllSortedItemsDTO
} from '@/dtos/sorted-items/find-all-sorted-items.dto';
import { SortedItemEntity } from '@/entities';
import { SortedItemModel } from '@/models/sorted-item.model';
import { FindAllSortedItemsQuery } from '@/queries/implements/sorted-items/find-all-sorted-items.query';

export class SortedItemMapper {
  toWhereFindAllPrisma(where: IWhere<WhereDataFindAllSortedItemsDTO>) {
    const prismaMapper = new PrismaMapper();
    return prismaMapper.toWhere({
      data: where,
      allowIsEmptyValues: {
        NOT: true
      },
      operatorMapper(operatorData) {
        return {
          id: prismaMapper.toWhereIds(operatorData.ids),
          parent: prismaMapper.toWhereData(operatorData.parent),
          app: prismaMapper.toWhereData(operatorData.app),
          updatedBy: prismaMapper.toWhereData(operatorData.updatedBy),
          createdBy: prismaMapper.toWhereData(operatorData.createdBy)
        };
      }
    });
  }
  toFindAllPrisma(data: FindAllSortedItemsDTO) {
    const prismaMapper = new PrismaMapper();
    const orderBy = prismaMapper.toOrderBy(cleanObject(data?.orderBy));
    return {
      where: this.toWhereFindAllPrisma(data?.where),
      orderBy,
      ...prismaMapper.toPagination({ page: data?.page })
    };
  }
  toFindAllQueryClean(query: FindAllSortedItemsQuery): FindAllSortedItemsQuery {
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
        index: cleanSortValue(query.orderBy?.index || 'asc')
      })
    };
  }
  toModel(sortedItem: SortedItemEntity) {
    return sortedItem && new SortedItemModel(sortedItem);
  }
  toModels(sortedItems: SortedItemEntity[]) {
    return sortedItems?.length > 0
      ? sortedItems.map(this.toModel).filter(Boolean)
      : [];
  }
}
