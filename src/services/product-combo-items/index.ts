import { CreateProductComboItemService } from './create-product-combo-item';
import { FindAllProductComboItemsService } from './find-all-product-combo-items';
import { FindProductComboItemByIdService } from './find-product-combo-item-by-id';
import { RemoveProductComboItemService } from './remove-product-combo-item';

export const ProductComboItemServices = [
  CreateProductComboItemService,
  RemoveProductComboItemService,
  FindProductComboItemByIdService,
  FindAllProductComboItemsService
];
