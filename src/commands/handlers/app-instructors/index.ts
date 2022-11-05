import { CreateAppInstructorCommandHandler } from './create-app-instructor';
import { RemoveAppInstructorCommandHandler } from './remove-app-instructor';

export const AppInstructorCommandHandlers = [
  CreateAppInstructorCommandHandler,
  RemoveAppInstructorCommandHandler
];
