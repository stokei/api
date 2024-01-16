import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';

import { pagarmeClient } from '@/clients/pagarme';
import { PagarmeCustomer } from '@/dtos/pagarme/pagarme-customer.dto';

@Injectable()
export class FindPagarmeCustomerByIdService
  implements IBaseService<string, Promise<PagarmeCustomer>>
{
  async execute(data: string): Promise<PagarmeCustomer> {
    const response = await pagarmeClient.get(`/customers/${data}`);
    const responseData = response?.data;
    if (!responseData) {
      return;
    }
    return responseData;
  }
}
