import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { UpdateCommentDTO } from '@/dtos/comments/update-comment.dto';

@Injectable()
export class UpdateCommentRepository
  implements IBaseRepository<UpdateCommentDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateCommentDTO): Promise<boolean> {
    const updated = await this.model.comment.update({
      where: {
        id: where?.commentId
      },
      data
    });
    return !!updated;
  }
}
