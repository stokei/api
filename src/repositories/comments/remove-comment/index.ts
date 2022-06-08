import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { RemoveCommentDTO } from '@/dtos/comments/remove-comment.dto';

@Injectable()
export class RemoveCommentRepository
  implements IBaseRepository<RemoveCommentDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveCommentDTO): Promise<boolean> {
    const removed = await this.model.comment.delete({
      where: {
        id: where?.commentId
      }
    });
    return !!removed;
  }
}
