import { ICommand } from '@nestjs/cqrs';

import {
  UpdateCheckoutDataDTO,
  UpdateCheckoutDTO,
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
