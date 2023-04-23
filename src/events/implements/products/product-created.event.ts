import { ProductModel } from '@/models/product.model';

interface IDataProductCreatedEvent {
  readonly createdBy: string;
  readonly catalog?: string;
  readonly product: ProductModel;
}

export class ProductCreatedEvent {
  readonly createdBy: string;
  readonly catalog?: string;
  readonly product: ProductModel;

  constructor(data: IDataProductCreatedEvent) {
    this.createdBy = data.createdBy;
    this.catalog = data.catalog;
    this.product = data.product;
  }
}
