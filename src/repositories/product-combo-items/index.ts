import { CountProductComboItemsRepository } from './count-product-combo-items';
import { CreateProductComboItemRepository } from './create-product-combo-item';
import { ExistsProductComboItemsRepository } from './exists-product-combo-items';
import { FindAllProductComboItemsRepository } from './find-all-product-combo-items';
import { FindProductComboItemByIdRepository } from './find-product-combo-item-by-id';
import { RemoveProductComboItemRepository } from './remove-product-combo-item';

export const ProductComboItemsRepositories = [
  CountProductComboItemsRepository,
  CreateProductComboItemRepository,
  ExistsProductComboItemsRepository,
  FindProductComboItemByIdRepository,
  FindAllProductComboItemsRepository,
  RemoveProductComboItemRepository
];
