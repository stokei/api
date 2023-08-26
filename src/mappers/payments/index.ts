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
  FindAllPaymentsDTO,
  WhereDataFindAllPaymentsDTO
} from '@/dtos/payments/find-all-payments.dto';
import { PaymentEntity } from '@/entities';
import { PaymentModel } from '@/models/payment.model';
import { FindAllPaymentsQuery } from '@/queries/implements/payments/find-all-payments.query';

export class PaymentMapper {
  toWhereFindAllPrisma(where: IWhere<WhereDataFindAllPaymentsDTO>) {
    const prismaMapper = new PrismaMapper();
    return prismaMapper.toWhere({
      data: where,
      allowIsEmptyValues: {
        NOT: true
      },
      operatorMapper(operatorData) {
        return {
          id: prismaMapper.toWhereIds(operatorData.ids),
          currency: prismaMapper.toWhereData(operatorData.currency),
          status: operatorData.status,
          paymentMethod: prismaMapper.toWhereData(operatorData.paymentMethod),
          active: prismaMapper.toWhereData(operatorData.active),
          parent: prismaMapper.toWhereDataSearch(operatorData.parent),
          payer: prismaMapper.toWhereDataSearch(operatorData.payer),
          app: prismaMapper.toWhereData(operatorData.app),
          updatedBy: prismaMapper.toWhereData(operatorData.updatedBy),
          createdBy: prismaMapper.toWhereData(operatorData.createdBy)
        };
      }
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
    return {
      ...query,
      where: cleanWhere({
        data: query?.where,
        operatorMapper(operatorData) {
          return {
            parent: cleanWhereDataSearch(operatorData.parent),
            payer: cleanWhereDataSearch(operatorData.payer),
            currency: cleanWhereDataString(operatorData.currency),
            status: operatorData.status,
            paymentMethod: cleanWhereDataString(operatorData.paymentMethod),
            active: cleanWhereDataBoolean(operatorData.active),
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
        currency: cleanSortValue(query.orderBy?.currency),
        status: cleanSortValue(query.orderBy?.status),
        paymentMethod: cleanSortValue(query.orderBy?.paymentMethod),
        totalAmount: cleanSortValue(query.orderBy?.totalAmount),
        subtotalAmount: cleanSortValue(query.orderBy?.subtotalAmount),
        feeAmount: cleanSortValue(query.orderBy?.feeAmount),
        active: cleanSortValue(query.orderBy?.active),
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      })
    };
  }
  toModel(payment: PaymentEntity) {
    return payment && new PaymentModel(payment);
  }
  toModels(payments: PaymentEntity[]) {
    return payments?.length > 0
      ? payments.map(this.toModel).filter(Boolean)
      : [];
  }
}
