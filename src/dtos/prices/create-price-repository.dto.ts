import { CreatePriceDTO } from './create-price.dto';

export interface CreatePriceRepositoryDTO
  extends Omit<CreatePriceDTO, 'recurring'> {
  stripePrice?: string;
  recurring?: string;
}
