import { CountAddressesRepository } from './count-addresses';
import { CreateAddressRepository } from './create-address';
import { ExistsAddressesRepository } from './exists-addresses';
import { FindAddressByIdRepository } from './find-address-by-id';
import { FindAllAddressesRepository } from './find-all-addresses';
import { RemoveAddressRepository } from './remove-address';
import { UpdateAddressRepository } from './update-address';

export const AddressesRepositories = [
  CountAddressesRepository,
  CreateAddressRepository,
  ExistsAddressesRepository,
  FindAddressByIdRepository,
  FindAllAddressesRepository,
  RemoveAddressRepository,
  UpdateAddressRepository
];
