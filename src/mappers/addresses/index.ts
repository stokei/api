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
  FindAllAddressesDTO,
  WhereDataFindAllAddressesDTO
} from '@/dtos/addresses/find-all-addresses.dto';
import { AddressEntity } from '@/entities';
import { AddressModel } from '@/models/address.model';
import { FindAllAddressesQuery } from '@/queries/implements/addresses/find-all-addresses.query';

export class AddressMapper {
  toWhereFindAllPrisma(where: IWhere<WhereDataFindAllAddressesDTO>) {
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
          updatedBy: prismaMapper.toWhereData(operatorData.updatedBy),
          createdBy: prismaMapper.toWhereData(operatorData.createdBy),
          street: prismaMapper.toWhereDataSearch(operatorData.street),
          complement: prismaMapper.toWhereDataSearch(operatorData.complement),
          city: prismaMapper.toWhereDataSearch(operatorData.city),
          country: prismaMapper.toWhereDataSearch(operatorData.country),
          state: prismaMapper.toWhereDataSearch(operatorData.state),
          postalCode: prismaMapper.toWhereData(operatorData.postalCode)
        };
      }
    });
  }
  toFindAllPrisma(data: FindAllAddressesDTO) {
    const prismaMapper = new PrismaMapper();
    const orderBy = prismaMapper.toOrderBy(cleanObject(data?.orderBy));
    return {
      where: this.toWhereFindAllPrisma(data?.where),
      orderBy,
      ...prismaMapper.toPagination({ page: data?.page })
    };
  }
  toFindAllQueryClean(query: FindAllAddressesQuery): FindAllAddressesQuery {
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
            street: cleanWhereDataSearch(operatorData.street),
            complement: cleanWhereDataSearch(operatorData.complement),
            city: cleanWhereDataSearch(operatorData.city),
            country: cleanWhereDataSearch(operatorData.country),
            state: cleanWhereDataSearch(operatorData.state),
            postalCode: cleanWhereDataString(operatorData.postalCode),
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
        default: cleanSortValue(query.orderBy?.default),
        street: cleanSortValue(query.orderBy?.street),
        complement: cleanSortValue(query.orderBy?.complement),
        city: cleanSortValue(query.orderBy?.city),
        country: cleanSortValue(query.orderBy?.country),
        state: cleanSortValue(query.orderBy?.state),
        postalCode: cleanSortValue(query.orderBy?.postalCode),
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      })
    };
  }
  toModel(address: AddressEntity) {
    return address && new AddressModel(address);
  }
  toModels(addresses: AddressEntity[]) {
    return addresses?.length > 0
      ? addresses.map(this.toModel).filter(Boolean)
      : [];
  }
}
