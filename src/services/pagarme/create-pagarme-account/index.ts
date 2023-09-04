import { Injectable } from '@nestjs/common';
import { cleanObject, IBaseService } from '@stokei/nestjs';

import { pagarmeClient } from '@/clients/pagarme';
import {
  CreatePagarmeAccountDTO,
  CreatePagarmeAccountResponse
} from '@/dtos/pagarme/create-pagarme-account.dto';
import { PagarmeAccountNotFoundException } from '@/errors';

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
    const dataRequest = cleanObject({
      name: data?.name,
      email: data?.email,
      document: data?.document,
      type: data?.documentType,
      code: data?.app,
      default_bank_account: {
        type: data?.defaultBankAccount?.bankAccountType,
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
        transfer_interval: 'Daily',
        transfer_day: 0
      }
    });
    try {
      const response = await pagarmeClient.post('/recipients', dataRequest);
      return response?.data;
    } catch (error) {
      const errorList: string[] =
        error?.response?.data?.errors &&
        Object.values(error?.response?.data?.errors);
      if (errorList?.length) {
        throw new Error(errorList?.[0]?.[0] || errorList?.[0]);
      }
      throw new PagarmeAccountNotFoundException();
    }
  }
}
