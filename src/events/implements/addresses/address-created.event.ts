import { AddressModel } from '@/models/address.model';

interface IDataAddressCreatedEvent {
  readonly createdBy: string;
  readonly address: AddressModel;
}

export class AddressCreatedEvent {
  readonly createdBy: string;
  readonly address: AddressModel;

  constructor(data: IDataAddressCreatedEvent) {
    this.createdBy = data.createdBy;
    this.address = data.address;
  }
}
