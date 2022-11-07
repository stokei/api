import { AddAppAdminToAppSubscriptionContractCommandHandler } from './add-app-admin-to-app-subscription-contract';
import { CreateAppAdminCommandHandler } from './create-app-admin';
import { RemoveAppAdminCommandHandler } from './remove-app-admin';
import { RemoveAppAdminFromAppSubscriptionContractCommandHandler } from './remove-app-admin-from-app-subscription-contract';

export const AppAdminCommandHandlers = [
  CreateAppAdminCommandHandler,
  RemoveAppAdminCommandHandler,
  AddAppAdminToAppSubscriptionContractCommandHandler,
  RemoveAppAdminFromAppSubscriptionContractCommandHandler
];
