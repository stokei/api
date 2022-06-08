import { AddressModel } from '@/models/address.model';

interface IDataAddressRemovedEvent {
  readonly address: AddressModel;
}

export class AddressRemovedEvent {
  readonly address: AddressModel;

  constructor(data: IDataAddressRemovedEvent) {
    this.address = data.address;
  }
}
