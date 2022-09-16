import {
  cleanObject,
  cleanSortValue,
  cleanValue,
  cleanValueNumber,
  cleanWhereDataBoolean,
  cleanWhereDataString,
  IOperator,
  IWhere,
  PrismaMapper,
  splitServiceId
} from '@stokei/nestjs';

import {
  FindAllInvoicesDTO,
  WhereDataFindAllInvoicesDTO
} from '@/dtos/invoices/find-all-invoices.dto';
import { InvoiceEntity } from '@/entities';
import { InvoiceModel } from '@/models/invoice.model';
import { FindAllInvoicesQuery } from '@/queries/implements/invoices/find-all-invoices.query';

export class InvoiceMapper {
  toWhereFindAllPrisma(where: IWhere<WhereDataFindAllInvoicesDTO>) {
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
        app: prismaMapper.toWhereData(operatorData.app),
        customer: prismaMapper.toWhereData(operatorData.customer),
        subscription: prismaMapper.toWhereData(operatorData.subscription),
        product: prismaMapper.toWhereDataSearch(operatorData.product),
        price: prismaMapper.toWhereData(operatorData.price),
        currency: prismaMapper.toWhereData(operatorData.currency),
        status: operatorData.status,
        active: prismaMapper.toWhereData(operatorData.active),
        stripeInvoice: prismaMapper.toWhereData(operatorData.stripeInvoice),
        stripeCheckoutSession: prismaMapper.toWhereData(
          operatorData.stripeCheckoutSession
        ),
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
  toFindAllPrisma(data: FindAllInvoicesDTO) {
    const prismaMapper = new PrismaMapper();
    const orderBy = prismaMapper.toOrderBy(cleanObject(data?.orderBy));
    return {
      where: this.toWhereFindAllPrisma(data?.where),
      orderBy,
      ...prismaMapper.toPagination({ page: data?.page })
    };
  }
  toFindAllQueryClean(query: FindAllInvoicesQuery): FindAllInvoicesQuery {
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
          app: cleanWhereDataString(operatorData.app),
          customer: cleanWhereDataString(operatorData.customer),
          subscription: cleanWhereDataString(operatorData.subscription),
          product: cleanWhereDataString(operatorData.product),
          price: cleanWhereDataString(operatorData.price),
          currency: cleanWhereDataString(operatorData.currency),
          status: operatorData.status,
          active: cleanWhereDataBoolean(operatorData.active),
          stripeInvoice: cleanWhereDataString(operatorData.stripeInvoice),
          stripeCheckoutSession: cleanWhereDataString(
            operatorData.stripeCheckoutSession
          ),
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
        status: cleanSortValue(query.orderBy?.status),
        totalAmount: cleanSortValue(query.orderBy?.totalAmount),
        subtotalAmount: cleanSortValue(query.orderBy?.subtotalAmount),
        active: cleanSortValue(query.orderBy?.active),
        paidAt: cleanSortValue(query.orderBy?.paidAt),
        canceledAt: cleanSortValue(query.orderBy?.canceledAt),
        paymentErrorAt: cleanSortValue(query.orderBy?.paymentErrorAt),
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      })
    };
  }
  toModel(invoice: InvoiceEntity) {
    return invoice && new InvoiceModel(invoice);
  }
  toModels(invoices: InvoiceEntity[]) {
    return invoices?.length > 0
      ? invoices.map(this.toModel).filter(Boolean)
      : [];
  }
}
