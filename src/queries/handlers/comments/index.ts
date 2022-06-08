import { FindCommentByIdQueryHandler } from './find-comment-by-id';
import { FindAllCommentsQueryHandler } from './find-all-comments';

export const CommentQueriesHandlers = [
  FindCommentByIdQueryHandler,
  FindAllCommentsQueryHandler
];
