import { CountPriceTiersRepository } from './count-price-tiers';
import { CreatePriceTierRepository } from './create-price-tier';
import { FindAllPriceTiersRepository } from './find-all-price-tiers';
import { FindPriceTierByIdRepository } from './find-price-tier-by-id';
import { RemovePriceTierRepository } from './remove-price-tier';
import { UpdatePriceTierRepository } from './update-price-tier';

export const PriceTiersRepositories = [
  CountPriceTiersRepository,
  CreatePriceTierRepository,
  FindPriceTierByIdRepository,
  FindAllPriceTiersRepository,
  RemovePriceTierRepository,
  UpdatePriceTierRepository
];
