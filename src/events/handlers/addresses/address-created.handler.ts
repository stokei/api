import { AddressCreatedEvent } from '@/events/implements/addresses/address-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(AddressCreatedEvent)
export class AddressCreatedHandler
  implements IEventHandler<AddressCreatedEvent>
{
  async handle(event: AddressCreatedEvent) {
    const { address } = event;
    Logger.log(`#${address.id} - created!`, AddressCreatedHandler.name);
    return event;
  }
}
