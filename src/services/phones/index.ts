import { CreatePhoneService } from './create-phone';
import { FindAllPhonesService } from './find-all-phones';
import { FindPhoneByIdService } from './find-phone-by-id';
import { RemovePhoneService } from './remove-phone';

export const PhoneServices = [
  CreatePhoneService,
  RemovePhoneService,
  FindPhoneByIdService,
  FindAllPhonesService
];
