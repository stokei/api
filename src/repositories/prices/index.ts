import { ActivatePriceRepository } from './activate-price';
import { CountPricesRepository } from './count-prices';
import { CreatePriceRepository } from './create-price';
import { DeactivatePriceRepository } from './deactivate-price';
import { ExistsPricesRepository } from './exists-prices';
import { FindAllPricesRepository } from './find-all-prices';
import { FindPriceByIdRepository } from './find-price-by-id';
import { FindPricesByStripePriceIdsRepository } from './find-prices-by-stripe-price-ids';
import { RemovePriceRepository } from './remove-price';
import { UpdatePriceRepository } from './update-price';

export const PricesRepositories = [
  CountPricesRepository,
  CreatePriceRepository,
  ExistsPricesRepository,
  FindPriceByIdRepository,
  FindAllPricesRepository,
  RemovePriceRepository,
  UpdatePriceRepository,
  FindPricesByStripePriceIdsRepository,
  ActivatePriceRepository,
  DeactivatePriceRepository
];
