import { PhoneModel } from '@/models/phone.model';

interface IDataPhoneUpdatedEvent {
  readonly phone: PhoneModel;
}

export class PhoneUpdatedEvent {
  readonly phone: PhoneModel;

  constructor(data: IDataPhoneUpdatedEvent) {
    this.phone = data.phone;
  }
}
