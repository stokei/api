import { CountClassroomsInstructorsRepository } from './count-classrooms-instructors';
import { CreateClassroomsInstructorRepository } from './create-classrooms-instructor';
import { ExistsClassroomsInstructorsRepository } from './exists-classrooms-instructors';
import { FindAllClassroomsInstructorsRepository } from './find-all-classrooms-instructors';
import { FindClassroomsInstructorByIdRepository } from './find-classrooms-instructor-by-id';
import { RemoveClassroomsInstructorRepository } from './remove-classrooms-instructor';
import { UpdateClassroomsInstructorRepository } from './update-classrooms-instructor';

export const ClassroomsInstructorsRepositories = [
  CountClassroomsInstructorsRepository,
  CreateClassroomsInstructorRepository,
  ExistsClassroomsInstructorsRepository,
  FindClassroomsInstructorByIdRepository,
  FindAllClassroomsInstructorsRepository,
  RemoveClassroomsInstructorRepository,
  UpdateClassroomsInstructorRepository
];
