import {
  cleanEmail,
  convertToISODateString,
  encryptPassword,
  generateSalt
} from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { AccountRole } from '@/enums/account-role.enum';
import { AccountStatus } from '@/enums/account-status.enum';
import { PASSWORD_SECRET_KEY } from '@/environments';
import { AccountModel, IAccountModelData } from '@/models/account.model';

export class AccountModelMock extends AccountModel {
  constructor(data?: Partial<IAccountModelData>) {
    const salt = data?.salt ?? generateSalt(PASSWORD_SECRET_KEY);
    super({
      _id: nanoid(),
      firstname: data?.firstname ?? 'Joao',
      lastname: data?.lastname ?? 'Sinners',
      username: data?.username ?? 'joaosinners',
      email: cleanEmail(data?.email ?? nanoid() + '@email.com'),
      password: encryptPassword(
        data?.password ?? '123456',
        salt,
        PASSWORD_SECRET_KEY
      ),
      salt,
      status: data?.status ?? AccountStatus.ACTIVE,
      roles: data?.roles ?? [AccountRole.USER],
      parent: data?.parent ?? 'anyParent',
      avatar: data?.avatar ?? 'anyavatar',
      active: data?.active ?? true,
      canceledAt: data?.canceledAt ?? null,
      forgotPasswordCode: data?.forgotPasswordCode ?? null,
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      dateBirthday: data?.dateBirthday ?? null,
      lastPassword: data?.lastPassword ?? null,
      updatedAt: data?.updatedAt ?? null
    });
  }
}
