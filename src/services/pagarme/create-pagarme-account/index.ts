import { Injectable } from '@nestjs/common';
import { cleanObject, IBaseService } from '@stokei/nestjs';

import { pagarmeClient } from '@/clients/pagarme';
import {
  CreatePagarmeAccountDTO,
  CreatePagarmeAccountResponse
} from '@/dtos/pagarme/create-pagarme-account.dto';

@Injectable()
export class CreatePagarmeAccountService
  implements
    IBaseService<
      CreatePagarmeAccountDTO,
      Promise<CreatePagarmeAccountResponse>
    >
{
  async execute(
    data: CreatePagarmeAccountDTO
  ): Promise<CreatePagarmeAccountResponse> {
    const response = await pagarmeClient.post(
      '/recipients',
      cleanObject({
        name: data?.name,
        email: data?.email,
        document: data?.document,
        type: data?.documentType,
        code: data?.app,
        default_bank_account: {
          type: 'savings',
          holder_document: data?.defaultBankAccount?.holderDocument,
          holder_type: data?.defaultBankAccount?.holderType,
          account_number: data?.defaultBankAccount?.accountNumber,
          account_check_digit: data?.defaultBankAccount?.accountCheckDigit,
          branch_check_digit: data?.defaultBankAccount?.branchCheckDigit,
          branch_number: data?.defaultBankAccount?.branchNumber,
          bank: data?.defaultBankAccount?.bank,
          holder_name: data?.defaultBankAccount?.holderName
        },
        transfer_settings: {
          transfer_enabled: true,
          transfer_interval: 'Daily'
        }
      })
    );
    return response?.data;
  }
}
