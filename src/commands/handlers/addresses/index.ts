import { CreateAddressCommandHandler } from './create-address';
import { RemoveAddressCommandHandler } from './remove-address';
import { UpdateAddressCommandHandler } from './update-address';

export const AddressCommandHandlers = [
  CreateAddressCommandHandler,
  RemoveAddressCommandHandler,
  UpdateAddressCommandHandler
];
