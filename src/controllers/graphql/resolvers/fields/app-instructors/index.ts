import { AppInstructorAppResolver } from './app';
import { AppInstructorCreatedByResolver } from './created-by';
import { AppInstructorInstructorResolver } from './instructor';
import { AppInstructorReferenceResolver } from './reference';
import { AppInstructorUpdatedByResolver } from './updated-by';

export const AppInstructorsFieldsResolvers = [
  AppInstructorReferenceResolver,
  AppInstructorAppResolver,
  AppInstructorInstructorResolver,
  AppInstructorCreatedByResolver,
  AppInstructorUpdatedByResolver
];
