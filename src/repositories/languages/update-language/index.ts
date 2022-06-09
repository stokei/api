import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateLanguageDTO } from '@/dtos/languages/update-language.dto';

@Injectable()
export class UpdateLanguageRepository
  implements IBaseRepository<UpdateLanguageDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateLanguageDTO): Promise<boolean> {
    const updated = await this.model.language.update({
      where: {
        id: where?.languageId
      },
      data
    });
    return !!updated;
  }
}
