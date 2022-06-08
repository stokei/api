import { FindClassroomByIdService } from './find-classroom-by-id';
import { FindAllClassroomsService } from './find-all-classrooms';
import { CreateClassroomService } from './create-classroom';
import { RemoveClassroomService } from './remove-classroom';
import { UpdateClassroomService } from './update-classroom';

export const ClassroomServices = [
  CreateClassroomService,
  RemoveClassroomService,
  UpdateClassroomService,
  FindClassroomByIdService,
  FindAllClassroomsService
];
