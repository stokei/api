import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountPaymentsMethodsWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountPaymentsMethodsWhereDTO =
  keyof CountPaymentsMethodsWhereDTO;

export type CountPaymentsMethodsDTO =
  IBaseCountDTO<CountPaymentsMethodsWhereDTO>;
