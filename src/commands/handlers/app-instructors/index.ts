import { AddAppInstructorToAppSubscriptionContractCommandHandler } from './add-app-instructor-to-app-subscription-contract';
import { CreateAppInstructorCommandHandler } from './create-app-instructor';
import { RemoveAppInstructorCommandHandler } from './remove-app-instructor';
import { RemoveAppInstructorFromAppSubscriptionContractCommandHandler } from './remove-app-instructor-from-app-subscription-contract';

export const AppInstructorCommandHandlers = [
  CreateAppInstructorCommandHandler,
  RemoveAppInstructorCommandHandler,
  AddAppInstructorToAppSubscriptionContractCommandHandler,
  RemoveAppInstructorFromAppSubscriptionContractCommandHandler
];
