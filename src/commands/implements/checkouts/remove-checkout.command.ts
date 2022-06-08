import { ICommand } from '@nestjs/cqrs';
import {
  RemoveCheckoutDTO,
  RemoveCheckoutWhereDTO
} from '@/dtos/checkouts/remove-checkout.dto';

export class RemoveCheckoutCommand implements ICommand, RemoveCheckoutDTO {
  where: RemoveCheckoutWhereDTO;
  constructor(data: RemoveCheckoutDTO) {
    this.where = data.where;
  }
}
