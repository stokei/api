import { CreatePhoneCommandHandler } from './create-phone';
import { RemovePhoneCommandHandler } from './remove-phone';

export const PhoneCommandHandlers = [
  CreatePhoneCommandHandler,
  RemovePhoneCommandHandler
];
