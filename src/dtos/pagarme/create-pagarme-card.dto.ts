import { AddressModel } from '@/models/address.model';

export interface CreatePagarmeCardDTO {
  customer: string;
  cardHash: string;
  address: AddressModel;
}
