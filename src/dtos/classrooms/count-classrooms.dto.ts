import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountClassroomsWhereDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereData;
  name?: IWhereDataSearch;
  description?: IWhereDataSearch;
  hasAccessToAllModules?: IWhereData<boolean>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountClassroomsWhereDTO = keyof CountClassroomsWhereDTO;

export type CountClassroomsDTO = IBaseCountDTO<CountClassroomsWhereDTO>;
