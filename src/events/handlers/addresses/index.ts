import { AddressCreatedHandler } from './address-created.handler';
import { AddressUpdatedHandler } from './address-updated.handler';
import { AddressRemovedHandler } from './address-removed.handler';

export const AddressEventsHandlers = [
  AddressCreatedHandler,
  AddressUpdatedHandler,
  AddressRemovedHandler
];
