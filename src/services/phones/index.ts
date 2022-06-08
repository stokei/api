import { FindPhoneByIdService } from './find-phone-by-id';
import { FindAllPhonesService } from './find-all-phones';
import { CreatePhoneService } from './create-phone';
import { RemovePhoneService } from './remove-phone';
import { UpdatePhoneService } from './update-phone';

export const PhoneServices = [
  CreatePhoneService,
  RemovePhoneService,
  UpdatePhoneService,
  FindPhoneByIdService,
  FindAllPhonesService
];
