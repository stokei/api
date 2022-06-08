import { ICommand } from '@nestjs/cqrs';
import {
  RemoveCommentDTO,
  RemoveCommentWhereDTO
} from '@/dtos/comments/remove-comment.dto';

export class RemoveCommentCommand implements ICommand, RemoveCommentDTO {
  where: RemoveCommentWhereDTO;
  constructor(data: RemoveCommentDTO) {
    this.where = data.where;
  }
}
