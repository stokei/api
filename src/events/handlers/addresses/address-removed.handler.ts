import { AddressRemovedEvent } from '@/events/implements/addresses/address-removed.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(AddressRemovedEvent)
export class AddressRemovedHandler
  implements IEventHandler<AddressRemovedEvent>
{
  async handle(event: AddressRemovedEvent) {
    const { address } = event;
    Logger.log(`#${address.id} - removed!`, AddressRemovedHandler.name);
    return event;
  }
}
