import { AddressModel } from '@/models/address.model';

interface IDataAddressUpdatedEvent {
  readonly address: AddressModel;
}

export class AddressUpdatedEvent {
  readonly address: AddressModel;

  constructor(data: IDataAddressUpdatedEvent) {
    this.address = data.address;
  }
}
