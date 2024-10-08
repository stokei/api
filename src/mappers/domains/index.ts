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
  FindAllDomainsDTO,
  WhereDataFindAllDomainsDTO
} from '@/dtos/domains/find-all-domains.dto';
import { DomainEntity } from '@/entities';
import { DomainModel } from '@/models/domain.model';
import { FindAllDomainsQuery } from '@/queries/implements/domains/find-all-domains.query';

export class DomainMapper {
  toWhereFindAllPrisma(where: IWhere<WhereDataFindAllDomainsDTO>) {
    const prismaMapper = new PrismaMapper();
    return prismaMapper.toWhere({
      data: where,
      allowIsEmptyValues: {
        NOT: true
      },
      operatorMapper(operatorData) {
        return {
          id: prismaMapper.toWhereIds(operatorData.ids),
          name: prismaMapper.toWhereDataSearch(operatorData.name),
          parent: prismaMapper.toWhereDataSearch(operatorData.parent),
          app: prismaMapper.toWhereData(operatorData.app),
          active: prismaMapper.toWhereData(operatorData.active),
          status: operatorData.status,
          updatedBy: prismaMapper.toWhereData(operatorData.updatedBy),
          createdBy: prismaMapper.toWhereData(operatorData.createdBy)
        };
      }
    });
  }
  toFindAllPrisma(data: FindAllDomainsDTO) {
    const prismaMapper = new PrismaMapper();
    const orderBy = prismaMapper.toOrderBy(cleanObject(data?.orderBy));
    return {
      where: this.toWhereFindAllPrisma(data?.where),
      orderBy,
      ...prismaMapper.toPagination({ page: data?.page })
    };
  }
  toFindAllQueryClean(query: FindAllDomainsQuery): FindAllDomainsQuery {
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
            name: cleanWhereDataSearch(operatorData.name),
            app: cleanWhereDataString(operatorData.app),
            active: cleanWhereDataBoolean(operatorData.active),
            status: operatorData.status,
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
        name: cleanSortValue(query.orderBy?.name),
        active: cleanSortValue(query.orderBy?.active),
        status: cleanSortValue(query.orderBy?.status),
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      })
    };
  }
  toModel(domain: DomainEntity) {
    return domain && new DomainModel(domain);
  }
  toModels(domains: DomainEntity[]) {
    return domains?.length > 0 ? domains.map(this.toModel).filter(Boolean) : [];
  }
}
