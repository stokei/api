import { CountCheckoutsRepository } from './count-checkouts';
import { CreateCheckoutRepository } from './create-checkout';
import { ExistsCheckoutsRepository } from './exists-checkouts';
import { FindAllCheckoutsRepository } from './find-all-checkouts';
import { FindCheckoutByIdRepository } from './find-checkout-by-id';
import { RemoveCheckoutRepository } from './remove-checkout';
import { UpdateCheckoutRepository } from './update-checkout';

export const CheckoutsRepositories = [
  CountCheckoutsRepository,
  CreateCheckoutRepository,
  ExistsCheckoutsRepository,
  FindCheckoutByIdRepository,
  FindAllCheckoutsRepository,
  RemoveCheckoutRepository,
  UpdateCheckoutRepository
];
