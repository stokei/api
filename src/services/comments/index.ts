import { CreateCommentService } from './create-comment';
import { FindAllCommentsService } from './find-all-comments';
import { FindCommentByIdService } from './find-comment-by-id';
import { RemoveCommentService } from './remove-comment';
import { UpdateCommentService } from './update-comment';

export const CommentServices = [
  CreateCommentService,
  RemoveCommentService,
  UpdateCommentService,
  FindCommentByIdService,
  FindAllCommentsService
];
