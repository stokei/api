import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllLanguagesDTO {
  ids?: string[];
  app?: IWhereData;
  active?: IWhereData<boolean>;
  name?: IWhereDataSearch;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllLanguagesDTO =
  keyof WhereDataFindAllLanguagesDTO;

export interface OrderByDataFindAllLanguagesDTO {
  name?: IOrderBy;
  active?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllLanguagesDTO =
  keyof OrderByDataFindAllLanguagesDTO;

export type FindAllLanguagesDTO = IBaseFindManyDTO<
  WhereDataFindAllLanguagesDTO,
  OrderByDataFindAllLanguagesDTO
>;
