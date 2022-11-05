import { AppInstructorCreatedHandler } from './app-instructor-created.handler';
import { AppInstructorRemovedHandler } from './app-instructor-removed.handler';

export const AppInstructorEventsHandlers = [
  AppInstructorCreatedHandler,
  AppInstructorRemovedHandler
];
