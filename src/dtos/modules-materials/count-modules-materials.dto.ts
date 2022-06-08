import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountModulesMaterialsWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountModulesMaterialsWhereDTO =
  keyof CountModulesMaterialsWhereDTO;

export type CountModulesMaterialsDTO =
  IBaseCountDTO<CountModulesMaterialsWhereDTO>;
