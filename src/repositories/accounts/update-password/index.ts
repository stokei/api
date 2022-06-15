import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdatePasswordRepositoryDTO } from '@/dtos/accounts/update-password-repository.dto';

@Injectable()
export class UpdatePasswordRepository
  implements IBaseRepository<UpdatePasswordRepositoryDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: UpdatePasswordRepositoryDTO): Promise<boolean> {
    const updated = await this.model.account.update({
      where: {
        id: data?.accountId
      },
      data: {
        password: data?.password,
        lastPassword: data?.lastPassword,
        forgotPasswordCode: null
      }
    });
    return !!updated;
  }
}
