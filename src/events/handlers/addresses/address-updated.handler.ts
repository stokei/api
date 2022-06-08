import { AddressUpdatedEvent } from '@/events/implements/addresses/address-updated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(AddressUpdatedEvent)
export class AddressUpdatedHandler
  implements IEventHandler<AddressUpdatedEvent>
{
  async handle(event: AddressUpdatedEvent) {
    const { address } = event;
    Logger.log(`#${address.id} - updated!`, AddressUpdatedHandler.name);
    return event;
  }
}
