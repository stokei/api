import { ActivateClassroomService } from './activate-classroom';
import { CreateClassroomService } from './create-classroom';
import { DeactivateClassroomService } from './deactivate-classroom';
import { FindAllClassroomsService } from './find-all-classrooms';
import { FindClassroomByIdService } from './find-classroom-by-id';
import { UpdateClassroomService } from './update-classroom';

export const ClassroomServices = [
  CreateClassroomService,
  UpdateClassroomService,
  FindClassroomByIdService,
  FindAllClassroomsService,
  DeactivateClassroomService,
  ActivateClassroomService
];
