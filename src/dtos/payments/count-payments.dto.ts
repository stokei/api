import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountPaymentsWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountPaymentsWhereDTO = keyof CountPaymentsWhereDTO;

export type CountPaymentsDTO = IBaseCountDTO<CountPaymentsWhereDTO>;
