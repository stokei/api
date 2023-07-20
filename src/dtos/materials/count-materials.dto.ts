import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountMaterialsWhereDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
  name?: IWhereDataSearch;
  description?: IWhereDataSearch;
  free?: IWhereData<boolean>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountMaterialsWhereDTO = keyof CountMaterialsWhereDTO;

export type CountMaterialsDTO = IBaseCountDTO<CountMaterialsWhereDTO>;
