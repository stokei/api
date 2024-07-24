import { ProductModel } from '@/models/product.model';

interface IDataProductCreatedEvent {
  readonly createdBy: string;
  readonly catalogs?: string[];
  readonly comboProducts?: string[];
  readonly product: ProductModel;
}

export class ProductCreatedEvent {
  readonly createdBy: string;
  readonly catalogs?: string[];
  readonly comboProducts?: string[];
  readonly product: ProductModel;

  constructor(data: IDataProductCreatedEvent) {
    this.createdBy = data.createdBy;
    this.catalogs = data.catalogs;
    this.comboProducts = data.comboProducts;
    this.product = data.product;
  }
}
