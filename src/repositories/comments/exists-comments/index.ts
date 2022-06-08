import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { ExistsCommentsDTO } from '@/dtos/comments/exists-comments.dto';
import { IBaseRepository } from '@stokei/nestjs';

@Injectable()
export class ExistsCommentsRepository
  implements IBaseRepository<ExistsCommentsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsCommentsDTO): Promise<boolean> {
    return (await this.model.comment.count({ where })) > 0;
  }
}
