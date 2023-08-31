import { Injectable } from '@nestjs/common';
import {
  cleanObject,
  convertToISODateString,
  IBaseService
} from '@stokei/nestjs';

import { pagarmeClient } from '@/clients/pagarme';
import {
  CreatePagarmeCustomerDTO,
  CreatePagarmeCustomerResponse
} from '@/dtos/pagarme/create-pagarme-customer.dto';

@Injectable()
export class CreatePagarmeCustomerService
  implements
    IBaseService<
      CreatePagarmeCustomerDTO,
      Promise<CreatePagarmeCustomerResponse>
    >
{
  async execute(
    data: CreatePagarmeCustomerDTO
  ): Promise<CreatePagarmeCustomerResponse> {
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
      document: data?.cpf,
      document_type: 'CPF',
      type: 'individual',
      gender: 'male'
    });
    try {
      const response = await pagarmeClient.post('/customers', dataRequest);
      return response?.data;
    } catch (error) {
      const errorList: string[] =
        error?.response?.data?.errors &&
        Object.values(error?.response?.data?.errors);
      if (errorList?.length) {
        throw new Error(errorList?.[0]?.[0] || errorList?.[0]);
      }
      throw error;
    }
  }
}
