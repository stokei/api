import { PhoneStatus } from '@/enums/phone-status.enum';

import { CreatePhoneDTO } from './create-phone.dto';

export interface CreatePhoneRepositoryDTO extends CreatePhoneDTO {
  fullnumber: string;
  validationCode: string;
  status: PhoneStatus;
}
