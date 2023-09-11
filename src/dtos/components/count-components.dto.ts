import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

import { ComponentType } from '@/enums/component-type.enum';

export interface CountComponentsWhereDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
  type?: ComponentType;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountComponentsWhereDTO = keyof CountComponentsWhereDTO;

export type CountComponentsDTO = IBaseCountDTO<CountComponentsWhereDTO>;
