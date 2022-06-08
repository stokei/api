import { ICommand } from '@nestjs/cqrs';
import {
  UpdateCheckoutDTO,
  UpdateCheckoutDataDTO,
  UpdateCheckoutWhereDTO
} from '@/dtos/checkouts/update-checkout.dto';

export class UpdateCheckoutCommand implements ICommand, UpdateCheckoutDTO {
  data: UpdateCheckoutDataDTO;
  where: UpdateCheckoutWhereDTO;
  constructor(data: UpdateCheckoutDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
