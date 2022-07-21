import { CountPhonesRepository } from './count-phones';
import { CreatePhoneRepository } from './create-phone';
import { ExistsPhonesRepository } from './exists-phones';
import { FindAllPhonesRepository } from './find-all-phones';
import { FindPhoneByIdRepository } from './find-phone-by-id';
import { RemovePhoneRepository } from './remove-phone';

export const PhonesRepositories = [
  CountPhonesRepository,
  CreatePhoneRepository,
  ExistsPhonesRepository,
  FindPhoneByIdRepository,
  FindAllPhonesRepository,
  RemovePhoneRepository
];
