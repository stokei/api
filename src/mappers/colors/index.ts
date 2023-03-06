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
  FindAllColorsDTO,
  WhereDataFindAllColorsDTO
} from '@/dtos/colors/find-all-colors.dto';
import { ColorEntity } from '@/entities';
import { ColorModel } from '@/models/color.model';
import { FindAllColorsQuery } from '@/queries/implements/colors/find-all-colors.query';

export class ColorMapper {
  toWhereFindAllPrisma(where: IWhere<WhereDataFindAllColorsDTO>) {
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
          app: prismaMapper.toWhereData(operatorData.app),
          color: prismaMapper.toWhereData(operatorData.color),
          themeMode: operatorData.themeMode,
          type: operatorData.type,
          updatedBy: prismaMapper.toWhereData(operatorData.updatedBy),
          createdBy: prismaMapper.toWhereData(operatorData.createdBy)
        };
      }
    });
  }
  toFindAllPrisma(data: FindAllColorsDTO) {
    const prismaMapper = new PrismaMapper();
    const orderBy = prismaMapper.toOrderBy(cleanObject(data?.orderBy));
    return {
      where: this.toWhereFindAllPrisma(data?.where),
      orderBy,
      ...prismaMapper.toPagination({ page: data?.page })
    };
  }
  toFindAllQueryClean(query: FindAllColorsQuery): FindAllColorsQuery {
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
            themeMode: operatorData.themeMode,
            type: operatorData.type,
            app: cleanWhereDataString(operatorData.app),
            color: cleanWhereDataString(operatorData.color),
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
        themeMode: cleanSortValue(query.orderBy?.themeMode),
        type: cleanSortValue(query.orderBy?.type),
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      })
    };
  }
  toModel(color: ColorEntity) {
    return color && new ColorModel(color);
  }
  toModels(colors: ColorEntity[]) {
    return colors?.length > 0 ? colors.map(this.toModel).filter(Boolean) : [];
  }
}
