import { CreateCommentCommandHandler } from './create-comment';
import { RemoveCommentCommandHandler } from './remove-comment';
import { UpdateCommentCommandHandler } from './update-comment';

export const CommentCommandHandlers = [
  CreateCommentCommandHandler,
  RemoveCommentCommandHandler,
  UpdateCommentCommandHandler
];
