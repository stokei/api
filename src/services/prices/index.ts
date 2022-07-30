import { CalculatePricesInformationService } from './calculate-prices-information';
import { CreatePriceService } from './create-price';
import { FindAllPricesService } from './find-all-prices';
import { FindPriceByIdService } from './find-price-by-id';
import { RemovePriceService } from './remove-price';
import { UpdatePriceService } from './update-price';

export const PriceServices = [
  CalculatePricesInformationService,
  CreatePriceService,
  RemovePriceService,
  UpdatePriceService,
  FindPriceByIdService,
  FindAllPricesService
];
