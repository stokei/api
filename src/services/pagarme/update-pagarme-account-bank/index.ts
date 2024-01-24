import { Injectable } from '@nestjs/common';
import { cleanObject, IBaseService } from '@stokei/nestjs';

import { pagarmeClient } from '@/clients/pagarme';
import {
  UpdatePagarmeAccountBankDTO,
  UpdatePagarmeAccountBankResponse
} from '@/dtos/pagarme/update-pagarme-account-bank.dto';
import { PagarmeAccountNotFoundException } from '@/errors';

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
      }
    });
    try {
      const response = await pagarmeClient.patch(
        `/recipients/${data?.recipient}/default-bank-account`,
        dataRequest
      );
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
