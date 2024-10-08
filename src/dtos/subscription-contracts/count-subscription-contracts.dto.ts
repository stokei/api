import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

import { SubscriptionContractStatus } from '@/enums/subscription-contract-status.enum';
import { SubscriptionContractType } from '@/enums/subscription-contract-type.enum';

export interface CountSubscriptionContractsWhereDTO {
  ids?: string[];
  app?: IWhereData;
  order?: IWhereData;
  parent?: IWhereDataSearch;
  paymentMethod?: IWhereData;
  status?: SubscriptionContractStatus;
  type?: SubscriptionContractType;
  active?: IWhereData<boolean>;
  automaticRenew?: IWhereData<boolean>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountSubscriptionContractsWhereDTO =
  keyof CountSubscriptionContractsWhereDTO;

export type CountSubscriptionContractsDTO =
  IBaseCountDTO<CountSubscriptionContractsWhereDTO>;
