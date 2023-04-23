import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountAddressesWhereDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
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
