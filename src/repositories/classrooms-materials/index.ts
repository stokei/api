import { CountClassroomsMaterialsRepository } from './count-classrooms-materials';
import { CreateClassroomsMaterialRepository } from './create-classrooms-material';
import { ExistsClassroomsMaterialsRepository } from './exists-classrooms-materials';
import { FindAllClassroomsMaterialsRepository } from './find-all-classrooms-materials';
import { FindClassroomsMaterialByIdRepository } from './find-classrooms-material-by-id';
import { RemoveClassroomsMaterialRepository } from './remove-classrooms-material';
import { UpdateClassroomsMaterialRepository } from './update-classrooms-material';

export const ClassroomsMaterialsRepositories = [
  CountClassroomsMaterialsRepository,
  CreateClassroomsMaterialRepository,
  ExistsClassroomsMaterialsRepository,
  FindClassroomsMaterialByIdRepository,
  FindAllClassroomsMaterialsRepository,
  RemoveClassroomsMaterialRepository,
  UpdateClassroomsMaterialRepository
];
