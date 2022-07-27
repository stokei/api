import {
  cleanObject,
  cleanSortValue,
  cleanValue,
  cleanValueNumber,
  cleanWhereDataString,
  convertToISODateString,
  IOperator,
  splitServiceId
} from '@stokei/nestjs';

import { PaymentEntity } from '@/entities';
import { PaymentModel } from '@/models/payment.model';
import { FindAllPaymentsQuery } from '@/queries/implements/payments/find-all-payments.query';

export class PaymentMapper {
  toWhereFindAllPrisma(where: IWhere<WhereDataFindAllPaymentsDTO>) {
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
        name: prismaMapper.toWhereDataSearch(operatorData.name),
        parent: prismaMapper.toWhereData(operatorData.parent),
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
  toFindAllPrisma(data: FindAllPaymentsDTO) {
    const prismaMapper = new PrismaMapper();
    const orderBy = prismaMapper.toOrderBy(cleanObject(data?.orderBy));
    return {
      where: this.toWhereFindAllPrisma(data?.where),
      orderBy,
      ...prismaMapper.toPagination({ page: data?.page })
    };
  }
  toFindAllQueryClean(query: FindAllPaymentsQuery): FindAllPaymentsQuery {
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
          customer: cleanWhereDataString(operatorData.customer),
          order: cleanWhereDataString(operatorData.order),
          externalPayment: cleanWhereDataString(operatorData.externalPayment),
          paymentMethod: cleanWhereDataString(operatorData.paymentMethod),
          status: operatorData.status,
          oldStatus: operatorData.oldStatus,
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
        amount: cleanSortValue(query.orderBy?.amount),
        status: cleanSortValue(query.orderBy?.status),
        oldStatus: cleanSortValue(query.orderBy?.oldStatus),
        active: cleanSortValue(query.orderBy?.active),
        paidAt: cleanSortValue(query.orderBy?.paidAt),
        canceledAt: cleanSortValue(query.orderBy?.canceledAt),
        paymentErrorAt: cleanSortValue(query.orderBy?.paymentErrorAt),
        totalRefundedAt: cleanSortValue(query.orderBy?.totalRefundedAt),
        parcialRefundedAt: cleanSortValue(query.orderBy?.parcialRefundedAt),
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      })
    };
  }
  toModel(payment: PaymentEntity) {
    return (
      payment &&
      new PaymentModel({
        ...payment,
        updatedAt: convertToISODateString(payment.updatedAt),
        createdAt: convertToISODateString(payment.createdAt)
      })
    );
  }
  toModels(payments: PaymentEntity[]) {
    return payments?.length > 0
      ? payments.map(this.toModel).filter(Boolean)
      : [];
  }
}
