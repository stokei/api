import { CountCommentsRepository } from './count-comments';
import { CreateCommentRepository } from './create-comment';
import { ExistsCommentsRepository } from './exists-comments';
import { FindCommentByIdRepository } from './find-comment-by-id';
import { FindAllCommentsRepository } from './find-all-comments';
import { RemoveCommentRepository } from './remove-comment';
import { UpdateCommentRepository } from './update-comment';

export const CommentsRepositories = [
  CountCommentsRepository,
  CreateCommentRepository,
  ExistsCommentsRepository,
  FindCommentByIdRepository,
  FindAllCommentsRepository,
  RemoveCommentRepository,
  UpdateCommentRepository
];
