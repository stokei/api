import { Injectable } from '@nestjs/common';
import { Payment } from 'mercadopago';

import { mercadopagoClient } from '@/clients/mercadopago';
import {
  FindPaymentByPaymentProcessorDTO,
  FindPaymentByPaymentProcessorResponse,
  IBaseServiceFindPaymentByPaymentProcessor
} from '@/dtos/payments-gateway/find-payment-by-gateway-processor.dto';

@Injectable()
export class MercadoPagoFindPaymentProcessorService
  implements IBaseServiceFindPaymentByPaymentProcessor
{
  async execute(
    data: FindPaymentByPaymentProcessorDTO
  ): Promise<FindPaymentByPaymentProcessorResponse> {
    const response = await new Payment(mercadopagoClient()).get({
      id: data?.id
    });
    return {
      id: response?.id + '',
      status: response?.status,
      referenceId: response?.external_reference
    };
  }
}
