import { CreateAddressResolver } from './create-address';
import { RemoveAddressResolver } from './remove-address';
import { UpdateAddressResolver } from './update-address';

export const AddressesMutations = [
  CreateAddressResolver,
  RemoveAddressResolver,
  UpdateAddressResolver
];
