import { AddAppAdminToAppSubscriptionContractCommandHandler } from './add-app-admin-to-app-subscription-contract';
import { AddAppInstructorToAppSubscriptionContractCommandHandler } from './add-app-instructor-to-app-subscription-contract';
import { AddItemToAppSubscriptionContractCommandHandler } from './add-item-to-app-subscription-contract';
import { CreateAppCommandHandler } from './create-app';
import { CreateAppCatalogCommandHandler } from './create-app-catalog';
import { CreateAppDefaultLandingPageCommandHandler } from './create-app-default-landing-page';
import { CreateAppPagarmeAccountCommandHandler } from './create-app-pagarme-account';
import { RemoveAppAdminFromAppSubscriptionContractCommandHandler } from './remove-app-admin-from-app-subscription-contract';
import { RemoveAppInstructorFromAppSubscriptionContractCommandHandler } from './remove-app-instructor-from-app-subscription-contract';
import { RemoveItemFromAppSubscriptionContractCommandHandler } from './remove-item-from-app-subscription-contract';
import { UpdateAppCommandHandler } from './update-app';

export const AppCommandHandlers = [
  CreateAppCommandHandler,
  UpdateAppCommandHandler,
  AddItemToAppSubscriptionContractCommandHandler,
  RemoveItemFromAppSubscriptionContractCommandHandler,
  AddAppInstructorToAppSubscriptionContractCommandHandler,
  RemoveAppInstructorFromAppSubscriptionContractCommandHandler,
  AddAppAdminToAppSubscriptionContractCommandHandler,
  RemoveAppAdminFromAppSubscriptionContractCommandHandler,
  CreateAppCatalogCommandHandler,
  CreateAppDefaultLandingPageCommandHandler,
  CreateAppPagarmeAccountCommandHandler
];
