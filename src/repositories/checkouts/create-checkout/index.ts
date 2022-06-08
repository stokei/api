import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { CheckoutMapper } from '@/mappers/checkouts';
import { CreateCheckoutDTO } from '@/dtos/checkouts/create-checkout.dto';
import { CheckoutModel } from '@/models/checkout.model';

@Injectable()
export class CreateCheckoutRepository
  implements IBaseRepository<CreateCheckoutDTO, Promise<CheckoutModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateCheckoutDTO): Promise<CheckoutModel> {
    return new CheckoutMapper().toModel(
      await this.model.checkout.create({ data })
    );
  }
}
