import { CreateClassroomsTagService } from './create-classrooms-tag';
import { FindAllClassroomsTagsService } from './find-all-classrooms-tags';
import { FindClassroomsTagByIdService } from './find-classrooms-tag-by-id';
import { RemoveClassroomsTagService } from './remove-classrooms-tag';
import { UpdateClassroomsTagService } from './update-classrooms-tag';

export const ClassroomsTagServices = [
  CreateClassroomsTagService,
  RemoveClassroomsTagService,
  UpdateClassroomsTagService,
  FindClassroomsTagByIdService,
  FindAllClassroomsTagsService
];
