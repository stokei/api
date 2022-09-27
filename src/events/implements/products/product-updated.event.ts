import { ProductModel } from '@/models/product.model';

interface IDataProductUpdatedEvent {
  readonly updatedBy: string;
  readonly product: ProductModel;
}

export class ProductUpdatedEvent {
  readonly updatedBy: string;
  readonly product: ProductModel;

  constructor(data: IDataProductUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.product = data.product;
  }
}
