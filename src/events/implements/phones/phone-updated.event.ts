import { PhoneModel } from '@/models/phone.model';

interface IDataPhoneUpdatedEvent {
  readonly updatedBy: string;
  readonly phone: PhoneModel;
}

export class PhoneUpdatedEvent {
  readonly updatedBy: string;
  readonly phone: PhoneModel;

  constructor(data: IDataPhoneUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.phone = data.phone;
  }
}
