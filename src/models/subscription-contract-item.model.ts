import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';

export interface ISubscriptionContractItemModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly app: string;
  readonly parent: string;
  readonly product: string;
  readonly quantity: number;
  readonly invoiceProduct: string;
  readonly invoicePrice: string;
  readonly stripeSubscriptionItem?: string;
  readonly recurring?: string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class SubscriptionContractItemModel extends AggregateRoot {
  readonly id: string;
  readonly app: string;
  readonly parent: string;
  readonly product: string;
  readonly quantity: number;
  readonly invoiceProduct: string;
  readonly invoicePrice: string;
  readonly stripeSubscriptionItem?: string;
  readonly recurring?: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: ISubscriptionContractItemModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.SUBSCRIPTION_CONTRACT_ITEMS,
      module: ServerStokeiApiIdPrefix.SUBSCRIPTION_CONTRACT_ITEMS,
      id: data._id?.toString() || data.id
    });
    this.app = data.app;
    this.parent = data.parent;
    this.product = data.product;
    this.quantity = data.quantity;
    this.invoiceProduct = data.invoiceProduct;
    this.invoicePrice = data.invoicePrice;
    this.stripeSubscriptionItem = data.stripeSubscriptionItem;
    this.recurring = data.recurring;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }
}
