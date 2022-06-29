import { ChangeFromOldDefaultAddressToNewDefaultAddressCommandHandler } from './change-from-old-default-address-to-new-default-address';
import { CreateAddressCommandHandler } from './create-address';
import { RemoveAddressCommandHandler } from './remove-address';
import { UpdateAddressCommandHandler } from './update-address';

export const AddressCommandHandlers = [
  ChangeFromOldDefaultAddressToNewDefaultAddressCommandHandler,
  CreateAddressCommandHandler,
  RemoveAddressCommandHandler,
  UpdateAddressCommandHandler
];
