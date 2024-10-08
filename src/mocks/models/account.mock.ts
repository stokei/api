import {
  cleanEmail,
  convertToISODateString,
  encryptPassword
} from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { AccountStatus } from '@/enums/account-status.enum';
import { PASSWORD_SECRET_KEY } from '@/environments';
import { AccountModel, IAccountModelData } from '@/models/account.model';

export class AccountModelMock extends AccountModel {
  constructor(data?: Partial<IAccountModelData>) {
    super({
      _id: data?.id ?? nanoid(),
      firstname: data?.firstname ?? 'Joao',
      lastname: data?.lastname ?? 'Sinners',
      username: data?.username ?? 'joaosinners',
      email: cleanEmail(data?.email ?? nanoid() + '@email.com'),
      password: encryptPassword({
        password: data?.password ?? '123456',
        secretKey: PASSWORD_SECRET_KEY
      }),
      status: data?.status ?? AccountStatus.ACTIVE,
      app: data?.app ?? 'anyParent',
      avatar: data?.avatar ?? 'anyavatar',
      active: data?.active ?? true,
      canceledAt: data?.canceledAt ?? null,
      forgotPasswordCode: data?.forgotPasswordCode ?? null,
      dateBirthday: data?.dateBirthday ?? null,
      lastPassword: data?.lastPassword ?? null,
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null,
      createdBy: data?.createdBy ?? 'accounts.anyAccount',
      updatedBy: data?.updatedBy ?? 'accounts.anyAccount'
    });
  }
}
