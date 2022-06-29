import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountModulesWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountModulesWhereDTO = keyof CountModulesWhereDTO;

export type CountModulesDTO = IBaseCountDTO<CountModulesWhereDTO>;
