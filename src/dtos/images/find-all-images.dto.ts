import { IBaseFindManyDTO, IOrderBy, IWhereData } from '@stokei/nestjs';

export interface WhereDataFindAllImagesDTO {
  ids?: string[];
  app?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllImagesDTO = keyof WhereDataFindAllImagesDTO;

export interface OrderByDataFindAllImagesDTO {
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllImagesDTO =
  keyof OrderByDataFindAllImagesDTO;

export type FindAllImagesDTO = IBaseFindManyDTO<
  WhereDataFindAllImagesDTO,
  OrderByDataFindAllImagesDTO
>;
