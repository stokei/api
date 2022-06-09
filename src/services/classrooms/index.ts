import { CreateClassroomService } from './create-classroom';
import { FindAllClassroomsService } from './find-all-classrooms';
import { FindClassroomByIdService } from './find-classroom-by-id';
import { RemoveClassroomService } from './remove-classroom';
import { UpdateClassroomService } from './update-classroom';

export const ClassroomServices = [
  CreateClassroomService,
  RemoveClassroomService,
  UpdateClassroomService,
  FindClassroomByIdService,
  FindAllClassroomsService
];
