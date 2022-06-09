import { CreateClassroomsPlanService } from './create-classrooms-plan';
import { FindAllClassroomsPlansService } from './find-all-classrooms-plans';
import { FindClassroomsPlanByIdService } from './find-classrooms-plan-by-id';
import { RemoveClassroomsPlanService } from './remove-classrooms-plan';
import { UpdateClassroomsPlanService } from './update-classrooms-plan';

export const ClassroomsPlanServices = [
  CreateClassroomsPlanService,
  RemoveClassroomsPlanService,
  UpdateClassroomsPlanService,
  FindClassroomsPlanByIdService,
  FindAllClassroomsPlansService
];
