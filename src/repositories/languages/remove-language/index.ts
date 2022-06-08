import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { RemoveLanguageDTO } from '@/dtos/languages/remove-language.dto';

@Injectable()
export class RemoveLanguageRepository
  implements IBaseRepository<RemoveLanguageDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveLanguageDTO): Promise<boolean> {
    const removed = await this.model.language.delete({
      where: {
        id: where?.languageId
      }
    });
    return !!removed;
  }
}
