import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountActivitiesActionsWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountActivitiesActionsWhereDTO =
  keyof CountActivitiesActionsWhereDTO;

export type CountActivitiesActionsDTO =
  IBaseCountDTO<CountActivitiesActionsWhereDTO>;
