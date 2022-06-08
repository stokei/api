import { PhoneModel } from '@/models/phone.model';

interface IDataPhoneRemovedEvent {
  readonly phone: PhoneModel;
}

export class PhoneRemovedEvent {
  readonly phone: PhoneModel;

  constructor(data: IDataPhoneRemovedEvent) {
    this.phone = data.phone;
  }
}
