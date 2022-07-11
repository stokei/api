import { CountClassroomInstructorsRepository } from './count-classroom-instructors';
import { CreateClassroomInstructorRepository } from './create-classroom-instructor';
import { ExistsClassroomInstructorsRepository } from './exists-classroom-instructors';
import { FindAllClassroomInstructorsRepository } from './find-all-classroom-instructors';
import { FindClassroomInstructorByIdRepository } from './find-classroom-instructor-by-id';
import { RemoveClassroomInstructorRepository } from './remove-classroom-instructor';
import { UpdateClassroomInstructorRepository } from './update-classroom-instructor';

export const ClassroomInstructorsRepositories = [
  CountClassroomInstructorsRepository,
  CreateClassroomInstructorRepository,
  ExistsClassroomInstructorsRepository,
  FindClassroomInstructorByIdRepository,
  FindAllClassroomInstructorsRepository,
  RemoveClassroomInstructorRepository,
  UpdateClassroomInstructorRepository
];
