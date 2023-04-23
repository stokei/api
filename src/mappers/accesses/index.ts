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

import {
  FindAllAccessesDTO,
  WhereDataFindAllAccessesDTO
} from '@/dtos/accesses/find-all-accesses.dto';
import { AccessEntity } from '@/entities';
import { AccessModel } from '@/models/access.model';
import { FindAllAccessesQuery } from '@/queries/implements/accesses/find-all-accesses.query';

export class AccessMapper {
  toWhereFindAllPrisma(where: IWhere<WhereDataFindAllAccessesDTO>) {
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
          active: prismaMapper.toWhereData(operatorData.active),
          app: prismaMapper.toWhereData(operatorData.app),
          updatedBy: prismaMapper.toWhereData(operatorData.updatedBy),
          createdBy: prismaMapper.toWhereData(operatorData.createdBy)
        };
      }
    });
  }
  toFindAllPrisma(data: FindAllAccessesDTO) {
    const prismaMapper = new PrismaMapper();
    const orderBy = prismaMapper.toOrderBy(cleanObject(data?.orderBy));
    return {
      where: this.toWhereFindAllPrisma(data?.where),
      orderBy,
      ...prismaMapper.toPagination({ page: data?.page })
    };
  }
  toFindAllQueryClean(query: FindAllAccessesQuery): FindAllAccessesQuery {
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
            active: cleanWhereDataBoolean(operatorData.active),
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
        active: cleanSortValue(query.orderBy?.active),
        expiresIn: cleanSortValue(query.orderBy?.expiresIn),
        canceledAt: cleanSortValue(query.orderBy?.canceledAt),
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      })
    };
  }
  toModel(access: AccessEntity) {
    return access && new AccessModel(access);
  }
  toModels(accesses: AccessEntity[]) {
    return accesses?.length > 0
      ? accesses.map(this.toModel).filter(Boolean)
      : [];
  }
}
