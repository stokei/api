import { CreateClassroomsMaterialService } from './create-classrooms-material';
import { FindAllClassroomsMaterialsService } from './find-all-classrooms-materials';
import { FindClassroomsMaterialByIdService } from './find-classrooms-material-by-id';
import { RemoveClassroomsMaterialService } from './remove-classrooms-material';
import { UpdateClassroomsMaterialService } from './update-classrooms-material';

export const ClassroomsMaterialServices = [
  CreateClassroomsMaterialService,
  RemoveClassroomsMaterialService,
  UpdateClassroomsMaterialService,
  FindClassroomsMaterialByIdService,
  FindAllClassroomsMaterialsService
];
