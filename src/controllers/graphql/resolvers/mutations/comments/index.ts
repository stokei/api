import { CreateCommentResolver } from './create-comment';
import { RemoveCommentResolver } from './remove-comment';
import { UpdateCommentResolver } from './update-comment';

export const CommentsMutations = [
  CreateCommentResolver,
  RemoveCommentResolver,
  UpdateCommentResolver
];
