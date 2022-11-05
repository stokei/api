import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsAppInstructorsDTO } from '@/dtos/app-instructors/exists-app-instructors.dto';

@Injectable()
export class ExistsAppInstructorsRepository
  implements IBaseRepository<ExistsAppInstructorsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsAppInstructorsDTO): Promise<boolean> {
    return (await this.model.appInstructor.count({ where })) > 0;
  }
}
