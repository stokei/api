import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountActivitiesWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountActivitiesWhereDTO = keyof CountActivitiesWhereDTO;

export type CountActivitiesDTO = IBaseCountDTO<CountActivitiesWhereDTO>;
