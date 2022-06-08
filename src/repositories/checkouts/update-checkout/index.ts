import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { UpdateCheckoutDTO } from '@/dtos/checkouts/update-checkout.dto';

@Injectable()
export class UpdateCheckoutRepository
  implements IBaseRepository<UpdateCheckoutDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateCheckoutDTO): Promise<boolean> {
    const updated = await this.model.checkout.update({
      where: {
        id: where?.checkoutId
      },
      data
    });
    return !!updated;
  }
}
