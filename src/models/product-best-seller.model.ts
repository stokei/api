import { ProductModel } from './product.model';

export interface IProductBestSellerModelData {
  readonly quantity: number;
  readonly product: ProductModel;
}

export class ProductBestSellerModel {
  readonly quantity: number;
  readonly product: ProductModel;

  constructor(data: IProductBestSellerModelData) {
    this.product = data.product;
    this.quantity = data.quantity;
  }
}
