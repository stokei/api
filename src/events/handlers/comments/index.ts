import { CommentCreatedHandler } from './comment-created.handler';
import { CommentUpdatedHandler } from './comment-updated.handler';
import { CommentRemovedHandler } from './comment-removed.handler';

export const CommentEventsHandlers = [
  CommentCreatedHandler,
  CommentUpdatedHandler,
  CommentRemovedHandler
];
