import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountModulesWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
  description?: IWhereDataSearch;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountModulesWhereDTO = keyof CountModulesWhereDTO;

export type CountModulesDTO = IBaseCountDTO<CountModulesWhereDTO>;
