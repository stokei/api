import { PhoneModel } from '@/models/phone.model';

interface IDataPhoneCreatedEvent {
  readonly createdBy: string;
  readonly phone: PhoneModel;
}

export class PhoneCreatedEvent {
  readonly createdBy: string;
  readonly phone: PhoneModel;

  constructor(data: IDataPhoneCreatedEvent) {
    this.createdBy = data.createdBy;
    this.phone = data.phone;
  }
}
