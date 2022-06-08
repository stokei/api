import { CreatePhoneResolver } from './create-phone';
import { RemovePhoneResolver } from './remove-phone';
import { UpdatePhoneResolver } from './update-phone';

export const PhonesMutations = [
  CreatePhoneResolver,
  RemovePhoneResolver,
  UpdatePhoneResolver
];
