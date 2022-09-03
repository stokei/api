import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

import { PhoneStatus } from '@/enums/phone-status.enum';

export interface WhereDataFindAllPhonesDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
  countryCode?: IWhereData<string>;
  areaCode?: IWhereData<string>;
  number?: IWhereData<string>;
  validationCode?: IWhereData<string>;
  status?: PhoneStatus;
  default?: IWhereData<boolean>;
  active?: IWhereData<boolean>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllPhonesDTO = keyof WhereDataFindAllPhonesDTO;

export interface OrderByDataFindAllPhonesDTO {
  fullnumber?: IOrderBy;
  countryCode?: IOrderBy;
  areaCode?: IOrderBy;
  number?: IOrderBy;
  status?: IOrderBy;
  default?: IOrderBy;
  active?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllPhonesDTO =
  keyof OrderByDataFindAllPhonesDTO;

export type FindAllPhonesDTO = IBaseFindManyDTO<
  WhereDataFindAllPhonesDTO,
  OrderByDataFindAllPhonesDTO
>;
