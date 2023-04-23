import {
  UpdateSubscriptionContractDataDTO,
  UpdateSubscriptionContractWhereDTO
} from './update-subscription-contract.dto';

export interface UpdateSubscriptionContractDataRepositoryDTO
  extends UpdateSubscriptionContractDataDTO {
  startAt?: string;
  endAt?: string;
}

export type UpdateSubscriptionContractWhereRepositoryDTO =
  UpdateSubscriptionContractWhereDTO;

export interface UpdateSubscriptionContractRepositoryDTO {
  data: UpdateSubscriptionContractDataRepositoryDTO;
  where: UpdateSubscriptionContractWhereRepositoryDTO;
}
