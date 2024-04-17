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
  FindAllPagesDTO,
  WhereDataFindAllPagesDTO
} from '@/dtos/pages/find-all-pages.dto';
import { PageEntity } from '@/entities';
import { PageModel } from '@/models/page.model';
import { FindAllPagesQuery } from '@/queries/implements/pages/find-all-pages.query';

export class PageMapper {
  toWhereFindAllPrisma(where: IWhere<WhereDataFindAllPagesDTO>) {
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
          title: prismaMapper.toWhereDataSearch(operatorData.title),
          slug: prismaMapper.toWhereDataSearch(operatorData.slug),
          type: operatorData.type,
          updatedBy: prismaMapper.toWhereData(operatorData.updatedBy),
          createdBy: prismaMapper.toWhereData(operatorData.createdBy)
        };
      }
    });
  }
  toFindAllPrisma(data: FindAllPagesDTO) {
    const prismaMapper = new PrismaMapper();
    const orderBy = prismaMapper.toOrderBy(cleanObject(data?.orderBy));
    return {
      where: this.toWhereFindAllPrisma(data?.where),
      orderBy,
      ...prismaMapper.toPagination({ page: data?.page })
    };
  }
  toFindAllQueryClean(query: FindAllPagesQuery): FindAllPagesQuery {
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
            title: cleanWhereDataSearch(operatorData.title),
            slug: cleanWhereDataSearch(operatorData.slug),
            app: cleanWhereDataString(operatorData.app),
            type: operatorData.type,
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
        type: cleanSortValue(query.orderBy?.type),
        title: cleanSortValue(query.orderBy?.title),
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      })
    };
  }
  toModel(page: PageEntity) {
    return page && new PageModel(page);
  }
  toModels(pages: PageEntity[]) {
    return pages?.length > 0 ? pages.map(this.toModel).filter(Boolean) : [];
  }
}
