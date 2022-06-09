import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import {
  IPaymentsMethodModelData,
  PaymentsMethodModel
} from '@/models/payments-method.model';

export class PaymentsMethodModelMock extends PaymentsMethodModel {
  constructor(data?: Partial<IPaymentsMethodModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'PaymentsMethod Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
