import { CountPricesRepository } from './count-prices';
import { CreatePriceRepository } from './create-price';
import { ExistsPricesRepository } from './exists-prices';
import { FindAllPricesRepository } from './find-all-prices';
import { FindPriceByIdRepository } from './find-price-by-id';
import { RemovePriceRepository } from './remove-price';
import { UpdatePriceRepository } from './update-price';

export const PricesRepositories = [
  CountPricesRepository,
  CreatePriceRepository,
  ExistsPricesRepository,
  FindPriceByIdRepository,
  FindAllPricesRepository,
  RemovePriceRepository,
  UpdatePriceRepository
];
