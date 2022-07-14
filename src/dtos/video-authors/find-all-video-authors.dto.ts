import { IBaseFindManyDTO, IOrderBy, IWhereData } from '@stokei/nestjs';

export interface WhereDataFindAllVideoAuthorsDTO {
  ids?: string[];
  video?: IWhereData;
  author?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllVideoAuthorsDTO =
  keyof WhereDataFindAllVideoAuthorsDTO;

export interface OrderByDataFindAllVideoAuthorsDTO {
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllVideoAuthorsDTO =
  keyof OrderByDataFindAllVideoAuthorsDTO;

export type FindAllVideoAuthorsDTO = IBaseFindManyDTO<
  WhereDataFindAllVideoAuthorsDTO,
  OrderByDataFindAllVideoAuthorsDTO
>;
