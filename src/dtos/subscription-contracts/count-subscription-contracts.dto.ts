import { IBaseCountDTO, IWhereData } from '@stokei/nestjs';

import { SubscriptionContractStatus } from '@/enums/subscription-contract-status.enum';
import { SubscriptionContractType } from '@/enums/subscription-contract-type.enum';

export interface CountSubscriptionContractsWhereDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereData;
  product?: IWhereData<string>;
  order?: IWhereData<string>;
  orderItem?: IWhereData<string>;
  orderProduct?: IWhereData<string>;
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
