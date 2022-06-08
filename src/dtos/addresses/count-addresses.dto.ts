import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountAddressesWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountAddressesWhereDTO = keyof CountAddressesWhereDTO;

export type CountAddressesDTO = IBaseCountDTO<CountAddressesWhereDTO>;
