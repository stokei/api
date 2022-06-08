import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountProjectsPlansWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountProjectsPlansWhereDTO = keyof CountProjectsPlansWhereDTO;

export type CountProjectsPlansDTO = IBaseCountDTO<CountProjectsPlansWhereDTO>;
