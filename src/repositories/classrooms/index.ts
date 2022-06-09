import { CountClassroomsRepository } from './count-classrooms';
import { CreateClassroomRepository } from './create-classroom';
import { ExistsClassroomsRepository } from './exists-classrooms';
import { FindAllClassroomsRepository } from './find-all-classrooms';
import { FindClassroomByIdRepository } from './find-classroom-by-id';
import { RemoveClassroomRepository } from './remove-classroom';
import { UpdateClassroomRepository } from './update-classroom';

export const ClassroomsRepositories = [
  CountClassroomsRepository,
  CreateClassroomRepository,
  ExistsClassroomsRepository,
  FindClassroomByIdRepository,
  FindAllClassroomsRepository,
  RemoveClassroomRepository,
  UpdateClassroomRepository
];
