import { AddressModel } from '@/models/address.model';

interface IDataAddressRemovedEvent {
  readonly removedBy: string;
  readonly address: AddressModel;
}

export class AddressRemovedEvent {
  readonly removedBy: string;
  readonly address: AddressModel;

  constructor(data: IDataAddressRemovedEvent) {
    this.removedBy = data.removedBy;
    this.address = data.address;
  }
}
