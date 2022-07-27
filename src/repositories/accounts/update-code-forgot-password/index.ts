import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateCodeForgotPasswordRepositoryDTO } from '@/dtos/accounts/update-code-forgot-password-repository.dto';

@Injectable()
export class UpdateCodeForgotPasswordRepository
  implements
    IBaseRepository<UpdateCodeForgotPasswordRepositoryDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: UpdateCodeForgotPasswordRepositoryDTO): Promise<boolean> {
    const updated = await this.model.account.update({
      where: { id: data?.account },
      data: {
        forgotPasswordCode: data?.code
      }
    });
    return !!updated;
  }
}
