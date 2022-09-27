import { ActivateClassroomRepository } from './activate-classroom';
import { CountClassroomsRepository } from './count-classrooms';
import { CreateClassroomRepository } from './create-classroom';
import { DeactivateClassroomRepository } from './deactivate-classroom';
import { ExistsClassroomsRepository } from './exists-classrooms';
import { FindAllClassroomsRepository } from './find-all-classrooms';
import { FindClassroomByIdRepository } from './find-classroom-by-id';
import { UpdateClassroomRepository } from './update-classroom';

export const ClassroomsRepositories = [
  CountClassroomsRepository,
  CreateClassroomRepository,
  ExistsClassroomsRepository,
  FindClassroomByIdRepository,
  FindAllClassroomsRepository,
  ActivateClassroomRepository,
  DeactivateClassroomRepository,
  UpdateClassroomRepository
];
