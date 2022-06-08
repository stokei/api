import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { LanguageMapper } from '@/mappers/languages';
import { CreateLanguageDTO } from '@/dtos/languages/create-language.dto';
import { LanguageModel } from '@/models/language.model';

@Injectable()
export class CreateLanguageRepository
  implements IBaseRepository<CreateLanguageDTO, Promise<LanguageModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateLanguageDTO): Promise<LanguageModel> {
    return new LanguageMapper().toModel(
      await this.model.language.create({ data })
    );
  }
}
