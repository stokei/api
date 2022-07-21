import { IBaseCountDTO, IWhereData } from '@stokei/nestjs';

import { SubscriptionStatus } from '@/enums/subscription-status.enum';
import { SubscriptionType } from '@/enums/subscription-type.enum';

export interface CountSubscriptionsWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  product?: IWhereData<string>;
  status?: IWhereData<SubscriptionStatus>;
  type?: IWhereData<SubscriptionType>;
  active?: IWhereData<boolean>;
  automaticRenew?: IWhereData<boolean>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountSubscriptionsWhereDTO = keyof CountSubscriptionsWhereDTO;

export type CountSubscriptionsDTO = IBaseCountDTO<CountSubscriptionsWhereDTO>;
