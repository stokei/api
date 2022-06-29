import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountAddressesWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  default?: IWhereData<boolean>;
  street?: IWhereDataSearch;
  complement?: IWhereDataSearch;
  city?: IWhereDataSearch;
  country?: IWhereDataSearch;
  state?: IWhereDataSearch;
  postalCode?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountAddressesWhereDTO = keyof CountAddressesWhereDTO;

export type CountAddressesDTO = IBaseCountDTO<CountAddressesWhereDTO>;
