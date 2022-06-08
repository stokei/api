import { FindAddressByIdService } from './find-address-by-id';
import { FindAllAddressesService } from './find-all-addresses';
import { CreateAddressService } from './create-address';
import { RemoveAddressService } from './remove-address';
import { UpdateAddressService } from './update-address';

export const AddressServices = [
  CreateAddressService,
  RemoveAddressService,
  UpdateAddressService,
  FindAddressByIdService,
  FindAllAddressesService
];
