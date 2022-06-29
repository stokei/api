import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountProjectsWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountProjectsWhereDTO = keyof CountProjectsWhereDTO;

export type CountProjectsDTO = IBaseCountDTO<CountProjectsWhereDTO>;
