import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountCommentsWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountCommentsWhereDTO = keyof CountCommentsWhereDTO;

export type CountCommentsDTO = IBaseCountDTO<CountCommentsWhereDTO>;
