import { AddressCreatedHandler } from './address-created.handler';
import { AddressRemovedHandler } from './address-removed.handler';
import { AddressUpdatedHandler } from './address-updated.handler';

export const AddressEventsHandlers = [
  AddressCreatedHandler,
  AddressUpdatedHandler,
  AddressRemovedHandler
];
