import {
  cleanObject,
  cleanSortValue,
  cleanValue,
  cleanValueNumber,
  cleanWhereDataString,
  convertToISODateString,
  IOperator,
  IWhere,
  PrismaMapper,
  splitServiceId
} from '@stokei/nestjs';

import {
  FindAllPaymentMethodsDTO,
  WhereDataFindAllPaymentMethodsDTO
} from '@/dtos/payment-methods/find-all-payment-methods.dto';
import { PaymentMethodEntity } from '@/entities';
import { PaymentMethodModel } from '@/models/payment-method.model';
import { FindAllPaymentMethodsQuery } from '@/queries/implements/payment-methods/find-all-payment-methods.query';

export class PaymentMethodMapper {
  toWhereFindAllPrisma(where: IWhere<WhereDataFindAllPaymentMethodsDTO>) {
    const prismaMapper = new PrismaMapper();
    const mapFromDTOOperatorDataToPrismaOperatorData = (
      operator: IOperator
    ) => {
      const operatorData = where?.[operator];
      if (!operatorData) {
        return null;
      }
      return {
        id: prismaMapper.toWhereIds(operatorData.ids),
        parent: prismaMapper.toWhereData(operatorData.parent),
        type: operatorData.type,
        provider: operatorData.provider,
        externalPaymentMethod: prismaMapper.toWhereData(
          operatorData.externalPaymentMethod
        ),
        cardBrand: prismaMapper.toWhereData(operatorData.cardBrand),
        active: prismaMapper.toWhereData(operatorData.active),
        app: prismaMapper.toWhereData(operatorData.app),
        updatedBy: prismaMapper.toWhereData(operatorData.updatedBy),
        createdBy: prismaMapper.toWhereData(operatorData.createdBy)
      };
    };
    return prismaMapper.toWhere({
      AND: mapFromDTOOperatorDataToPrismaOperatorData('AND'),
      OR: mapFromDTOOperatorDataToPrismaOperatorData('OR'),
      NOT: mapFromDTOOperatorDataToPrismaOperatorData('NOT')
    });
  }
  toFindAllPrisma(data: FindAllPaymentMethodsDTO) {
    const prismaMapper = new PrismaMapper();
    const orderBy = prismaMapper.toOrderBy(cleanObject(data?.orderBy));
    return {
      where: this.toWhereFindAllPrisma(data?.where),
      orderBy,
      ...prismaMapper.toPagination({ page: data?.page })
    };
  }
  toFindAllQueryClean(
    query: FindAllPaymentMethodsQuery
  ): FindAllPaymentMethodsQuery {
    if (!query) {
      return null;
    }
    const clearWhereOperatorData = (operator: IOperator) => {
      const operatorData = query?.where?.[operator];
      if (!operatorData) {
        return null;
      }
      return {
        [operator]: {
          parent: cleanWhereDataString(operatorData.parent),
          type: operatorData.type,
          provider: operatorData.provider,
          externalPaymentMethod: cleanWhereDataString(
            operatorData.externalPaymentMethod
          ),
          cardBrand: cleanWhereDataString(operatorData.cardBrand),
          active: operatorData.active,
          app: cleanWhereDataString(operatorData.app),
          updatedBy: cleanWhereDataString(operatorData.updatedBy),
          createdBy: cleanWhereDataString(operatorData.createdBy),
          ids:
            operatorData.ids?.length > 0
              ? operatorData.ids.map((id) => splitServiceId(cleanValue(id))?.id)
              : undefined
        }
      };
    };
    return {
      ...query,
      where: {
        ...cleanObject(clearWhereOperatorData('AND')),
        ...cleanObject(clearWhereOperatorData('OR')),
        ...cleanObject(clearWhereOperatorData('NOT'), true)
      },
      page: cleanObject({
        limit: cleanValueNumber(query.page?.limit),
        number: cleanValueNumber(query.page?.number)
      }),
      orderBy: cleanObject({
        type: cleanSortValue(query.orderBy?.type),
        provider: cleanSortValue(query.orderBy?.provider),
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      })
    };
  }
  toModel(paymentMethod: PaymentMethodEntity) {
    return (
      paymentMethod &&
      new PaymentMethodModel({
        ...paymentMethod,
        updatedAt: convertToISODateString(paymentMethod.updatedAt),
        createdAt: convertToISODateString(paymentMethod.createdAt)
      })
    );
  }
  toModels(paymentMethods: PaymentMethodEntity[]) {
    return paymentMethods?.length > 0
      ? paymentMethods.map(this.toModel).filter(Boolean)
      : [];
  }
}
