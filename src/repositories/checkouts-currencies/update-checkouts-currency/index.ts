import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { UpdateCheckoutsCurrencyDTO } from '@/dtos/checkouts-currencies/update-checkouts-currency.dto';

@Injectable()
export class UpdateCheckoutsCurrencyRepository
  implements IBaseRepository<UpdateCheckoutsCurrencyDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateCheckoutsCurrencyDTO): Promise<boolean> {
    const updated = await this.model.checkoutsCurrency.update({
      where: {
        id: where?.checkoutsCurrencyId
      },
      data
    });
    return !!updated;
  }
}
