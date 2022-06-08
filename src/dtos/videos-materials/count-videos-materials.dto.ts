import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountVideosMaterialsWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountVideosMaterialsWhereDTO =
  keyof CountVideosMaterialsWhereDTO;

export type CountVideosMaterialsDTO =
  IBaseCountDTO<CountVideosMaterialsWhereDTO>;
