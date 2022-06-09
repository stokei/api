import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CommentMapper } from '@/mappers/comments';
import { CommentModel } from '@/models/comment.model';

@Injectable()
export class FindCommentByIdRepository
  implements IBaseRepository<string, Promise<CommentModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<CommentModel> {
    return new CommentMapper().toModel(
      await this.model.comment.findUnique({
        where: { id }
      })
    );
  }
}
