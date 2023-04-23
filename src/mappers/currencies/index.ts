import {
  cleanObject,
  cleanSortValue,
  cleanValue,
  cleanValueNumber,
  cleanWhere,
  cleanWhereDataNumber,
  cleanWhereDataSearch,
  cleanWhereDataString,
  IWhere,
  PrismaMapper
} from '@stokei/nestjs';

import {
  FindAllCurrenciesDTO,
  WhereDataFindAllCurrenciesDTO
} from '@/dtos/currencies/find-all-currencies.dto';
import { CurrencyEntity } from '@/entities';
import { CurrencyModel } from '@/models/currency.model';
import { FindAllCurrenciesQuery } from '@/queries/implements/currencies/find-all-currencies.query';

export class CurrencyMapper {
  toWhereFindAllPrisma(where: IWhere<WhereDataFindAllCurrenciesDTO>) {
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
          minorUnit: prismaMapper.toWhereData(operatorData.minorUnit),
          updatedBy: prismaMapper.toWhereData(operatorData.updatedBy),
          createdBy: prismaMapper.toWhereData(operatorData.createdBy)
        };
      }
    });
  }
  toFindAllPrisma(data: FindAllCurrenciesDTO) {
    const prismaMapper = new PrismaMapper();
    const orderBy = prismaMapper.toOrderBy(cleanObject(data?.orderBy));
    return {
      where: this.toWhereFindAllPrisma(data?.where),
      orderBy,
      ...prismaMapper.toPagination({ page: data?.page })
    };
  }
  toFindAllQueryClean(query: FindAllCurrenciesQuery): FindAllCurrenciesQuery {
    if (!query) {
      return null;
    }
    return {
      ...query,
      where: cleanWhere({
        data: query?.where,
        operatorMapper(operatorData) {
          return {
            minorUnit: cleanWhereDataNumber(operatorData.minorUnit),
            name: cleanWhereDataSearch(operatorData.name),
            updatedBy: cleanWhereDataString(operatorData.updatedBy),
            createdBy: cleanWhereDataString(operatorData.createdBy),
            ids:
              operatorData.ids?.length > 0
                ? operatorData.ids.map((id) => cleanValue(id))
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
        minorUnit: cleanSortValue(query.orderBy?.minorUnit),
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      })
    };
  }
  toModel(currency: CurrencyEntity) {
    return currency && new CurrencyModel(currency);
  }
  toModels(currencies: CurrencyEntity[]) {
    return currencies?.length > 0
      ? currencies.map(this.toModel).filter(Boolean)
      : [];
  }
}
