import { IBaseCountDTO, IWhereData } from '@stokei/nestjs';

export interface CountAccessesWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  active?: IWhereData<boolean>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountAccessesWhereDTO = keyof CountAccessesWhereDTO;

export type CountAccessesDTO = IBaseCountDTO<CountAccessesWhereDTO>;
