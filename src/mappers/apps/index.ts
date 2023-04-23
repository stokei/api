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
  FindAllAppsDTO,
  WhereDataFindAllAppsDTO
} from '@/dtos/apps/find-all-apps.dto';
import { AppEntity } from '@/entities';
import { AppModel } from '@/models/app.model';
import { FindAllAppsQuery } from '@/queries/implements/apps/find-all-apps.query';

export class AppMapper {
  toWhereFindAllPrisma(where: IWhere<WhereDataFindAllAppsDTO>) {
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
          description: prismaMapper.toWhereDataSearch(operatorData.description),
          status: operatorData.status,
          plan: prismaMapper.toWhereData(operatorData.plan),
          currency: prismaMapper.toWhereData(operatorData.currency),
          active: prismaMapper.toWhereData(operatorData.active),
          app: prismaMapper.toWhereData(operatorData.app),
          updatedBy: prismaMapper.toWhereData(operatorData.updatedBy),
          createdBy: prismaMapper.toWhereData(operatorData.createdBy)
        };
      }
    });
  }
  toFindAllPrisma(data: FindAllAppsDTO) {
    const prismaMapper = new PrismaMapper();
    const orderBy = prismaMapper.toOrderBy(cleanObject(data?.orderBy));
    return {
      where: this.toWhereFindAllPrisma(data?.where),
      orderBy,
      ...prismaMapper.toPagination({ page: data?.page })
    };
  }
  toFindAllQueryClean(query: FindAllAppsQuery): FindAllAppsQuery {
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
            description: cleanWhereDataString(operatorData.description),
            status: operatorData.status,
            plan: cleanWhereDataString(operatorData.plan),
            currency: cleanWhereDataString(operatorData.currency),
            active: cleanWhereDataBoolean(operatorData.active),
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
        slug: cleanSortValue(query.orderBy?.name),
        status: cleanSortValue(query.orderBy?.name),
        plan: cleanSortValue(query.orderBy?.name),
        currency: cleanSortValue(query.orderBy?.name),
        active: cleanSortValue(query.orderBy?.name),
        blockedAt: cleanSortValue(query.orderBy?.name),
        activatedAt: cleanSortValue(query.orderBy?.name),
        deactivatedAt: cleanSortValue(query.orderBy?.name),
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      })
    };
  }
  toModel(app: AppEntity) {
    return app && new AppModel(app);
  }
  toModels(apps: AppEntity[]) {
    return apps?.length > 0 ? apps.map(this.toModel).filter(Boolean) : [];
  }
}
