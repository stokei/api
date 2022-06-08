import { FindClassroomsStudentByIdService } from './find-classrooms-student-by-id';
import { FindAllClassroomsStudentsService } from './find-all-classrooms-students';
import { CreateClassroomsStudentService } from './create-classrooms-student';
import { RemoveClassroomsStudentService } from './remove-classrooms-student';
import { UpdateClassroomsStudentService } from './update-classrooms-student';

export const ClassroomsStudentServices = [
  CreateClassroomsStudentService,
  RemoveClassroomsStudentService,
  UpdateClassroomsStudentService,
  FindClassroomsStudentByIdService,
  FindAllClassroomsStudentsService
];
