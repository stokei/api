import { AddressModel } from '@/models/address.model';

interface IDataAddressUpdatedEvent {
  readonly updatedBy: string;
  readonly address: AddressModel;
}

export class AddressUpdatedEvent {
  readonly updatedBy: string;
  readonly address: AddressModel;

  constructor(data: IDataAddressUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.address = data.address;
  }
}
