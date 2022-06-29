import { PhoneModel } from '@/models/phone.model';

interface IDataPhoneRemovedEvent {
  readonly removedBy: string;
  readonly phone: PhoneModel;
}

export class PhoneRemovedEvent {
  readonly removedBy: string;
  readonly phone: PhoneModel;

  constructor(data: IDataPhoneRemovedEvent) {
    this.removedBy = data.removedBy;
    this.phone = data.phone;
  }
}
