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
  FindAllCouponsDTO,
  WhereDataFindAllCouponsDTO
} from '@/dtos/coupons/find-all-coupons.dto';
import { CouponEntity } from '@/entities';
import { CouponModel } from '@/models/coupon.model';
import { FindAllCouponsQuery } from '@/queries/implements/coupons/find-all-coupons.query';

export class CouponMapper {
  toWhereFindAllPrisma(where: IWhere<WhereDataFindAllCouponsDTO>) {
    const prismaMapper = new PrismaMapper();
    return prismaMapper.toWhere({
      data: where,
      allowIsEmptyValues: {
        NOT: true
      },
      operatorMapper(operatorData) {
        return {
          id: prismaMapper.toWhereIds(operatorData.ids),
          code: prismaMapper.toWhereDataSearch(operatorData.code),
          parent: prismaMapper.toWhereDataSearch(operatorData.parent),
          recipient: prismaMapper.toWhereData(operatorData.recipient),
          app: prismaMapper.toWhereData(operatorData.app),
          updatedBy: prismaMapper.toWhereData(operatorData.updatedBy),
          createdBy: prismaMapper.toWhereData(operatorData.createdBy)
        };
      }
    });
  }
  toFindAllPrisma(data: FindAllCouponsDTO) {
    const prismaMapper = new PrismaMapper();
    const orderBy = prismaMapper.toOrderBy(cleanObject(data?.orderBy));
    return {
      where: this.toWhereFindAllPrisma(data?.where),
      orderBy,
      ...prismaMapper.toPagination({ page: data?.page })
    };
  }
  toFindAllQueryClean(query: FindAllCouponsQuery): FindAllCouponsQuery {
    if (!query) {
      return null;
    }
    return {
      ...query,
      where: cleanWhere({
        data: query?.where,
        operatorMapper(operatorData) {
          return {
            code: cleanWhereDataSearch(operatorData.code),
            parent: cleanWhereDataSearch(operatorData.parent),
            recipient: cleanWhereDataString(operatorData.recipient),
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
        code: cleanSortValue(query.orderBy?.code),
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      })
    };
  }
  toModel(coupon: CouponEntity) {
    return coupon && new CouponModel(coupon);
  }
  toModels(coupons: CouponEntity[]) {
    return coupons?.length > 0 ? coupons.map(this.toModel).filter(Boolean) : [];
  }
}
