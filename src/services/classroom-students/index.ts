import { CreateClassroomStudentService } from './create-classroom-student';
import { FindAllClassroomStudentsService } from './find-all-classroom-students';
import { FindClassroomStudentByIdService } from './find-classroom-student-by-id';
import { RemoveClassroomStudentService } from './remove-classroom-student';
import { UpdateClassroomStudentService } from './update-classroom-student';

export const ClassroomStudentServices = [
  CreateClassroomStudentService,
  RemoveClassroomStudentService,
  UpdateClassroomStudentService,
  FindClassroomStudentByIdService,
  FindAllClassroomStudentsService
];
