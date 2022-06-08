import { convertToISODateString } from '@stokei/nestjs';
import { CartsItemEntity } from '@/entities';
import { CartsItemModel } from '@/models/carts-item.model';

export class CartsItemMapper {
  toModel(cartsItem: CartsItemEntity) {
    return (
      cartsItem &&
      new CartsItemModel({
        ...cartsItem,
        updatedAt: convertToISODateString(cartsItem.updatedAt),
        createdAt: convertToISODateString(cartsItem.createdAt)
      })
    );
  }
  toModels(cartsItems: CartsItemEntity[]) {
    return cartsItems?.length > 0
      ? cartsItems.map(this.toModel).filter(Boolean)
      : [];
  }
}
