import { AccessModel, IAccessModelData } from '@/models/access.model';
import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

export class AccessModelMock extends AccessModel {
  constructor(data?: Partial<IAccessModelData>) {
    super({
      _id: nanoid(),
      expiresIn: data?.expiresIn ?? convertToISODateString(Date.now()),
      accessToken: data?.accessToken ?? 'myToken',
      refreshToken: data?.refreshToken ?? 'myRefreshToken',
      parent: data?.parent ?? 'anyParent',
      active: data?.active ?? true,
      canceledAt: data?.canceledAt ?? convertToISODateString(Date.now()),
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
