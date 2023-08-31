import { Injectable } from '@nestjs/common';
import { cleanObject, convertToISODate, IBaseService } from '@stokei/nestjs';

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
    const birthdateToBRDate = convertToISODate(data.dateBirthday);
    const dateBirthday = birthdateToBRDate?.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    const dataRequest = cleanObject({
      phones: {
        mobile_phone: {
          country_code: data?.phone?.countryCode,
          area_code: data?.phone?.areaCode,
          number: data?.phone?.number
        }
      },
      birthdate: dateBirthday,
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
      console.log('CreatePagarmeCustomerService:' + error);
      const errorList: string[] = error?.errors && Object.values(error?.errors);
      if (errorList?.length) {
        throw new Error(errorList?.[0]?.[0] || errorList?.[0]);
      }
      throw error;
    }
  }
}
