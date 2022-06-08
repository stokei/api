import { PhoneModel } from '@/models/phone.model';

interface IDataPhoneCreatedEvent {
  readonly phone: PhoneModel;
}

export class PhoneCreatedEvent {
  readonly phone: PhoneModel;

  constructor(data: IDataPhoneCreatedEvent) {
    this.phone = data.phone;
  }
}
