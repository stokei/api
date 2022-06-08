import { ICommand } from '@nestjs/cqrs';
import {
  UpdateProductsImageDTO,
  UpdateProductsImageDataDTO,
  UpdateProductsImageWhereDTO
} from '@/dtos/products-images/update-products-image.dto';

export class UpdateProductsImageCommand
  implements ICommand, UpdateProductsImageDTO
{
  data: UpdateProductsImageDataDTO;
  where: UpdateProductsImageWhereDTO;
  constructor(data: UpdateProductsImageDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
