import { Injectable } from '@nestjs/common';
import { cleanObject, IBaseService } from '@stokei/nestjs';

import { pagarmeClient } from '@/clients/pagarme';
import { CreatePagarmeCardDTO } from '@/dtos/pagarme/create-pagarme-card.dto';
import { PagarmeCard } from '@/dtos/pagarme/pagarme-card.dto';
import { getPagarmeError } from '@/utils/get-pagarme-error';

@Injectable()
export class CreatePagarmeCardService
  implements IBaseService<CreatePagarmeCardDTO, Promise<PagarmeCard>>
{
  async execute(data: CreatePagarmeCardDTO): Promise<PagarmeCard> {
    const dataRequest = cleanObject({
      token: data?.cardHash,
      billing_address: {
        line_1:
          data?.address?.street +
          ', ' +
          data?.address?.number +
          ', ' +
          data?.address?.complement,
        zip_code: data?.address?.postalCode,
        city: data?.address?.city,
        state: data?.address?.state,
        country: data?.address?.country
      }
    });
    try {
      const response = await pagarmeClient.post(
        `/customers/${data.customer}/cards`,
        dataRequest
      );
      const responseData = response?.data;
      if (!responseData) {
        return;
      }
      const errorList: any = responseData?.errors;
      if (errorList) {
        const error = getPagarmeError(errorList);
        if (error) {
          throw error;
        }
      }

      return {
        id: responseData?.id,
        brand: responseData?.brand + '',
        lastFourNumber: responseData?.last_four_digits + '',
        expiryMonth: responseData?.exp_month + '',
        expiryYear: responseData?.exp_year + ''
      };
    } catch (error) {
      const pagarmeError = getPagarmeError(error?.response?.data?.errors);
      if (pagarmeError) {
        throw pagarmeError;
      }
      throw error;
    }
  }
}
