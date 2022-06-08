import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountTagsWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountTagsWhereDTO = keyof CountTagsWhereDTO;

export type CountTagsDTO = IBaseCountDTO<CountTagsWhereDTO>;
