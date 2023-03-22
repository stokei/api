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
  FindAllCatalogsDTO,
  WhereDataFindAllCatalogsDTO
} from '@/dtos/catalogs/find-all-catalogs.dto';
import { CatalogEntity } from '@/entities';
import { CatalogModel } from '@/models/catalog.model';
import { FindAllCatalogsQuery } from '@/queries/implements/catalogs/find-all-catalogs.query';

export class CatalogMapper {
  toWhereFindAllPrisma(where: IWhere<WhereDataFindAllCatalogsDTO>) {
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
          parent: prismaMapper.toWhereDataSearch(operatorData.parent),
          title: prismaMapper.toWhereDataSearch(operatorData.title),
          subtitle: prismaMapper.toWhereDataSearch(operatorData.subtitle),
          updatedBy: prismaMapper.toWhereData(operatorData.updatedBy),
          createdBy: prismaMapper.toWhereData(operatorData.createdBy)
        };
      }
    });
  }
  toFindAllPrisma(data: FindAllCatalogsDTO) {
    const prismaMapper = new PrismaMapper();
    const orderBy = prismaMapper.toOrderBy(cleanObject(data?.orderBy));
    return {
      where: this.toWhereFindAllPrisma(data?.where),
      orderBy,
      ...prismaMapper.toPagination({ page: data?.page })
    };
  }
  toFindAllQueryClean(query: FindAllCatalogsQuery): FindAllCatalogsQuery {
    if (!query) {
      return null;
    }
    return {
      ...query,
      where: cleanWhere({
        data: query?.where,
        operatorMapper(operatorData) {
          return {
            app: cleanWhereDataString(operatorData.app),
            parent: cleanWhereDataSearch(operatorData.parent),
            title: cleanWhereDataSearch(operatorData.title),
            subtitle: cleanWhereDataSearch(operatorData.subtitle),
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
        title: cleanSortValue(query.orderBy?.title),
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      })
    };
  }
  toModel(catalog: CatalogEntity) {
    return catalog && new CatalogModel(catalog);
  }
  toModels(catalogs: CatalogEntity[]) {
    return catalogs?.length > 0
      ? catalogs.map(this.toModel).filter(Boolean)
      : [];
  }
}
