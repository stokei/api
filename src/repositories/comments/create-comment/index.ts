import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateCommentDTO } from '@/dtos/comments/create-comment.dto';
import { CommentMapper } from '@/mappers/comments';
import { CommentModel } from '@/models/comment.model';

@Injectable()
export class CreateCommentRepository
  implements IBaseRepository<CreateCommentDTO, Promise<CommentModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateCommentDTO): Promise<CommentModel> {
    return new CommentMapper().toModel(
      await this.model.comment.create({ data })
    );
  }
}
