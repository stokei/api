import { CountClassroomsPlansRepository } from './count-classrooms-plans';
import { CreateClassroomsPlanRepository } from './create-classrooms-plan';
import { ExistsClassroomsPlansRepository } from './exists-classrooms-plans';
import { FindClassroomsPlanByIdRepository } from './find-classrooms-plan-by-id';
import { FindAllClassroomsPlansRepository } from './find-all-classrooms-plans';
import { RemoveClassroomsPlanRepository } from './remove-classrooms-plan';
import { UpdateClassroomsPlanRepository } from './update-classrooms-plan';

export const ClassroomsPlansRepositories = [
  CountClassroomsPlansRepository,
  CreateClassroomsPlanRepository,
  ExistsClassroomsPlansRepository,
  FindClassroomsPlanByIdRepository,
  FindAllClassroomsPlansRepository,
  RemoveClassroomsPlanRepository,
  UpdateClassroomsPlanRepository
];
