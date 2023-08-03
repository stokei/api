import { Injectable } from '@nestjs/common';
import { cleanObject, IBaseService } from '@stokei/nestjs';

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
    const response = await pagarmeClient.post(
      '/customers',
      cleanObject({
        phones: {
          mobile_phone: {
            country_code: data?.phone?.countryCode,
            area_code: data?.phone?.areaCode,
            number: data?.phone?.number
          }
        },
        birthdate: data?.dateBirthday,
        name: data?.name,
        email: data?.email,
        code: data?.account,
        document: data?.cpf,
        document_type: 'CPF',
        type: 'individual',
        gender: 'male'
      })
    );
    return response?.data;
  }
}
