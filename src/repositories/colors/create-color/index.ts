import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { ColorMapper } from '@/mappers/colors';
import { CreateColorDTO } from '@/dtos/colors/create-color.dto';
import { ColorModel } from '@/models/color.model';

@Injectable()
export class CreateColorRepository
  implements IBaseRepository<CreateColorDTO, Promise<ColorModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateColorDTO): Promise<ColorModel> {
    return new ColorMapper().toModel(await this.model.color.create({ data }));
  }
}
