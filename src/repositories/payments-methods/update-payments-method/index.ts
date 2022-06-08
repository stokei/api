import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { UpdatePaymentsMethodDTO } from '@/dtos/payments-methods/update-payments-method.dto';

@Injectable()
export class UpdatePaymentsMethodRepository
  implements IBaseRepository<UpdatePaymentsMethodDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdatePaymentsMethodDTO): Promise<boolean> {
    const updated = await this.model.paymentsMethod.update({
      where: {
        id: where?.paymentsMethodId
      },
      data
    });
    return !!updated;
  }
}
