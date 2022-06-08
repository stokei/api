import { FindClassroomsTagByIdService } from './find-classrooms-tag-by-id';
import { FindAllClassroomsTagsService } from './find-all-classrooms-tags';
import { CreateClassroomsTagService } from './create-classrooms-tag';
import { RemoveClassroomsTagService } from './remove-classrooms-tag';
import { UpdateClassroomsTagService } from './update-classrooms-tag';

export const ClassroomsTagServices = [
  CreateClassroomsTagService,
  RemoveClassroomsTagService,
  UpdateClassroomsTagService,
  FindClassroomsTagByIdService,
  FindAllClassroomsTagsService
];
