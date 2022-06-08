import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountOrdersAddressesWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountOrdersAddressesWhereDTO =
  keyof CountOrdersAddressesWhereDTO;

export type CountOrdersAddressesDTO =
  IBaseCountDTO<CountOrdersAddressesWhereDTO>;
