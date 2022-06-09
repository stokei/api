import { CommentCreatedHandler } from './comment-created.handler';
import { CommentRemovedHandler } from './comment-removed.handler';
import { CommentUpdatedHandler } from './comment-updated.handler';

export const CommentEventsHandlers = [
  CommentCreatedHandler,
  CommentUpdatedHandler,
  CommentRemovedHandler
];
