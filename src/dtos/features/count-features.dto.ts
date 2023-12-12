import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountFeaturesWhereDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch<string | string[]>;
  name?: IWhereDataSearch;
  description?: IWhereDataSearch;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountFeaturesWhereDTO = keyof CountFeaturesWhereDTO;

export type CountFeaturesDTO = IBaseCountDTO<CountFeaturesWhereDTO>;
