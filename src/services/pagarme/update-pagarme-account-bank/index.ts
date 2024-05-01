import { Injectable } from '@nestjs/common';
import { cleanObject, IBaseService } from '@stokei/nestjs';

import { pagarmeClient } from '@/clients/pagarme';
import {
  UpdatePagarmeAccountBankDTO,
  UpdatePagarmeAccountBankResponse
} from '@/dtos/pagarme/update-pagarme-account-bank.dto';
import { getPagarmeError } from '@/utils/get-pagarme-error';

@Injectable()
export class UpdatePagarmeAccountBankService
  implements
    IBaseService<
      UpdatePagarmeAccountBankDTO,
      Promise<UpdatePagarmeAccountBankResponse>
    >
{
  async execute(
    data: UpdatePagarmeAccountBankDTO
  ): Promise<UpdatePagarmeAccountBankResponse> {
    const dataRequest = cleanObject({
      bank_account: {
        type: data?.defaultBankAccount?.bankAccountType,
        holder_document: data?.defaultBankAccount?.holderDocument,
        holder_type: data?.defaultBankAccount?.holderType,
        account_number: data?.defaultBankAccount?.accountNumber,
        account_check_digit: data?.defaultBankAccount?.accountCheckDigit,
        branch_check_digit: data?.defaultBankAccount?.branchCheckDigit,
        branch_number: data?.defaultBankAccount?.branchNumber,
        bank: data?.defaultBankAccount?.bank,
        holder_name: data?.defaultBankAccount?.holderName
      }
    });
    try {
      const response = await pagarmeClient.patch(
        `/recipients/${data?.recipient}/default-bank-account`,
        dataRequest
      );
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
