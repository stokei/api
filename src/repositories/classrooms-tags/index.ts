import { CountClassroomsTagsRepository } from './count-classrooms-tags';
import { CreateClassroomsTagRepository } from './create-classrooms-tag';
import { ExistsClassroomsTagsRepository } from './exists-classrooms-tags';
import { FindAllClassroomsTagsRepository } from './find-all-classrooms-tags';
import { FindClassroomsTagByIdRepository } from './find-classrooms-tag-by-id';
import { RemoveClassroomsTagRepository } from './remove-classrooms-tag';
import { UpdateClassroomsTagRepository } from './update-classrooms-tag';

export const ClassroomsTagsRepositories = [
  CountClassroomsTagsRepository,
  CreateClassroomsTagRepository,
  ExistsClassroomsTagsRepository,
  FindClassroomsTagByIdRepository,
  FindAllClassroomsTagsRepository,
  RemoveClassroomsTagRepository,
  UpdateClassroomsTagRepository
];
