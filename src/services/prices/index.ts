import { FindPriceByIdService } from './find-price-by-id';
import { FindAllPricesService } from './find-all-prices';
import { CreatePriceService } from './create-price';
import { RemovePriceService } from './remove-price';
import { UpdatePriceService } from './update-price';

export const PriceServices = [
  CreatePriceService,
  RemovePriceService,
  UpdatePriceService,
  FindPriceByIdService,
  FindAllPricesService
];
