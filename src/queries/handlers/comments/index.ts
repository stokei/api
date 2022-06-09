import { FindAllCommentsQueryHandler } from './find-all-comments';
import { FindCommentByIdQueryHandler } from './find-comment-by-id';

export const CommentQueriesHandlers = [
  FindCommentByIdQueryHandler,
  FindAllCommentsQueryHandler
];
