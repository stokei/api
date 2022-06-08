import { NotFoundException } from '@nestjs/common';

export class CommentsNotFoundException extends NotFoundException {
  constructor() {
    super('commentsNotFound');
  }
}
