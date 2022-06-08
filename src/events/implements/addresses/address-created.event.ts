import { AddressModel } from '@/models/address.model';

interface IDataAddressCreatedEvent {
  readonly address: AddressModel;
}

export class AddressCreatedEvent {
  readonly address: AddressModel;

  constructor(data: IDataAddressCreatedEvent) {
    this.address = data.address;
  }
}
