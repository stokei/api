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
  FindAllSitesDTO,
  WhereDataFindAllSitesDTO
} from '@/dtos/sites/find-all-sites.dto';
import { SiteEntity } from '@/entities';
import { SiteModel } from '@/models/site.model';
import { FindAllSitesQuery } from '@/queries/implements/sites/find-all-sites.query';

export class SiteMapper {
  toWhereFindAllPrisma(where: IWhere<WhereDataFindAllSitesDTO>) {
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
          name: prismaMapper.toWhereDataSearch(operatorData.name),
          slug: prismaMapper.toWhereDataSearch(operatorData.slug),
          app: prismaMapper.toWhereData(operatorData.app),
          updatedBy: prismaMapper.toWhereData(operatorData.updatedBy),
          createdBy: prismaMapper.toWhereData(operatorData.createdBy)
        };
      }
    });
  }
  toFindAllPrisma(data: FindAllSitesDTO) {
    const prismaMapper = new PrismaMapper();
    const orderBy = prismaMapper.toOrderBy(cleanObject(data?.orderBy));
    return {
      where: this.toWhereFindAllPrisma(data?.where),
      orderBy,
      ...prismaMapper.toPagination({ page: data?.page })
    };
  }
  toFindAllQueryClean(query: FindAllSitesQuery): FindAllSitesQuery {
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
            slug: cleanWhereDataSearch(operatorData.slug),
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
      site: cleanObject({
        limit: cleanValueNumber(query.site?.limit),
        number: cleanValueNumber(query.site?.number)
      }),
      orderBy: cleanObject({
        name: cleanSortValue(query.orderBy?.name),
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      })
    };
  }
  toModel(site: SiteEntity) {
    return site && new SiteModel(site);
  }
  toModels(sites: SiteEntity[]) {
    return sites?.length > 0 ? sites.map(this.toModel).filter(Boolean) : [];
  }
}
