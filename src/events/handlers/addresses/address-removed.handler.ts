import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { AddressRemovedEvent } from '@/events/implements/addresses/address-removed.event';

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
