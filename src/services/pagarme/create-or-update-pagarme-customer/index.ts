import { Injectable } from '@nestjs/common';
import {
  cleanObject,
  convertToISODateString,
  IBaseService
} from '@stokei/nestjs';

import { pagarmeClient } from '@/clients/pagarme';
import {
  CreateOrUpdatePagarmeCustomerDTO,
  CreateOrUpdatePagarmeCustomerResponse
} from '@/dtos/pagarme/create-or-update-pagarme-customer.dto';
import { getPagarmeError } from '@/utils/get-pagarme-error';

@Injectable()
export class CreateOrUpdatePagarmeCustomerService
  implements
    IBaseService<
      CreateOrUpdatePagarmeCustomerDTO,
      Promise<CreateOrUpdatePagarmeCustomerResponse>
    >
{
  async execute(
    data: CreateOrUpdatePagarmeCustomerDTO
  ): Promise<CreateOrUpdatePagarmeCustomerResponse> {
    const birthdate = convertToISODateString(data.dateBirthday);
    const dataRequest = cleanObject({
      phones: {
        mobile_phone: {
          country_code: data?.phone?.countryCode,
          area_code: data?.phone?.areaCode,
          number: data?.phone?.number
        }
      },
      birthdate,
      name: data?.name,
      email: data?.email,
      code: data?.account,
      document: data?.document?.document,
      document_type: data?.document?.type,
      type: 'individual',
      gender: 'male'
    });
    try {
      const response = await pagarmeClient.post('/customers', dataRequest);
      return response?.data;
    } catch (error) {
      const pagarmeError = getPagarmeError(error?.response?.data?.errors);
      if (pagarmeError) {
        throw pagarmeError;
      }
      throw error;
    }
  }
}
