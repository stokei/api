import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountAccessesWhereDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch<string | string[]>;
  active?: IWhereData<boolean>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountAccessesWhereDTO = keyof CountAccessesWhereDTO;

export type CountAccessesDTO = IBaseCountDTO<CountAccessesWhereDTO>;
