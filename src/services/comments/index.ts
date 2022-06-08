import { FindCommentByIdService } from './find-comment-by-id';
import { FindAllCommentsService } from './find-all-comments';
import { CreateCommentService } from './create-comment';
import { RemoveCommentService } from './remove-comment';
import { UpdateCommentService } from './update-comment';

export const CommentServices = [
  CreateCommentService,
  RemoveCommentService,
  UpdateCommentService,
  FindCommentByIdService,
  FindAllCommentsService
];
