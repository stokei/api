import { CreatePhoneCommandHandler } from './create-phone';
import { RemovePhoneCommandHandler } from './remove-phone';
import { UpdatePhoneCommandHandler } from './update-phone';

export const PhoneCommandHandlers = [
  CreatePhoneCommandHandler,
  RemovePhoneCommandHandler,
  UpdatePhoneCommandHandler
];
