import { ICommand } from '@nestjs/cqrs';

import { CreateCommentDTO } from '@/dtos/comments/create-comment.dto';

export class CreateCommentCommand implements ICommand, CreateCommentDTO {
  name: string;
  parent: string;

  constructor(data: CreateCommentDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
