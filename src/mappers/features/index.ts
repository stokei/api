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
  FindAllFeaturesDTO,
  WhereDataFindAllFeaturesDTO
} from '@/dtos/features/find-all-features.dto';
import { FeatureEntity } from '@/entities';
import { FeatureModel } from '@/models/feature.model';
import { FindAllFeaturesQuery } from '@/queries/implements/features/find-all-features.query';

export class FeatureMapper {
  toWhereFindAllPrisma(where: IWhere<WhereDataFindAllFeaturesDTO>) {
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
          description: prismaMapper.toWhereDataSearch(operatorData.description),
          updatedBy: prismaMapper.toWhereData(operatorData.updatedBy),
          createdBy: prismaMapper.toWhereData(operatorData.createdBy)
        };
      }
    });
  }
  toFindAllPrisma(data: FindAllFeaturesDTO) {
    const prismaMapper = new PrismaMapper();
    const orderBy = prismaMapper.toOrderBy(cleanObject(data?.orderBy));
    return {
      where: this.toWhereFindAllPrisma(data?.where),
      orderBy,
      ...prismaMapper.toPagination({ page: data?.page })
    };
  }
  toFindAllQueryClean(query: FindAllFeaturesQuery): FindAllFeaturesQuery {
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
            description: cleanWhereDataSearch(operatorData.description),
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
        name: cleanSortValue(query.orderBy?.name),
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      })
    };
  }
  toModel(feature: FeatureEntity) {
    return feature && new FeatureModel(feature);
  }
  toModels(features: FeatureEntity[]) {
    return features?.length > 0
      ? features.map(this.toModel).filter(Boolean)
      : [];
  }
}
