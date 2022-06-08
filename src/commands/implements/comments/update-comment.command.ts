import { ICommand } from '@nestjs/cqrs';
import {
  UpdateCommentDTO,
  UpdateCommentDataDTO,
  UpdateCommentWhereDTO
} from '@/dtos/comments/update-comment.dto';

export class UpdateCommentCommand implements ICommand, UpdateCommentDTO {
  data: UpdateCommentDataDTO;
  where: UpdateCommentWhereDTO;
  constructor(data: UpdateCommentDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
