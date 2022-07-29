import { CreatePriceDTO } from './create-price.dto';

export interface CreatePriceRepositoryDTO extends CreatePriceDTO {
  amount: number;
}
