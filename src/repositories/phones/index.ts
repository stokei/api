import { CountPhonesRepository } from './count-phones';
import { CreatePhoneRepository } from './create-phone';
import { ExistsPhonesRepository } from './exists-phones';
import { FindPhoneByIdRepository } from './find-phone-by-id';
import { FindAllPhonesRepository } from './find-all-phones';
import { RemovePhoneRepository } from './remove-phone';
import { UpdatePhoneRepository } from './update-phone';

export const PhonesRepositories = [
  CountPhonesRepository,
  CreatePhoneRepository,
  ExistsPhonesRepository,
  FindPhoneByIdRepository,
  FindAllPhonesRepository,
  RemovePhoneRepository,
  UpdatePhoneRepository
];
