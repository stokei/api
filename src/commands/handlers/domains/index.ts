import { AddDomainToAppSubscriptionContractCommandHandler } from './add-domain-to-app-subscription-contract';
import { CreateDomainCommandHandler } from './create-domain';
import { RemoveDomainCommandHandler } from './remove-domain';
import { RemoveDomainFromAppSubscriptionContractCommandHandler } from './remove-domain-from-app-subscription-contract';

export const DomainCommandHandlers = [
  CreateDomainCommandHandler,
  RemoveDomainCommandHandler,
  AddDomainToAppSubscriptionContractCommandHandler,
  RemoveDomainFromAppSubscriptionContractCommandHandler
];
