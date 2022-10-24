import { CreatePriceTierService } from './create-price-tier';
import { FindAllPriceTiersService } from './find-all-price-tiers';
import { FindPriceTierByIdService } from './find-price-tier-by-id';
import { RemovePriceTierService } from './remove-price-tier';
import { UpdatePriceTierService } from './update-price-tier';

export const PriceTierServices = [
  CreatePriceTierService,
  RemovePriceTierService,
  UpdatePriceTierService,
  FindPriceTierByIdService,
  FindAllPriceTiersService
];
