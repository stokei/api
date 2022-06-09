import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ImageUpdatedEvent } from '@/events/implements/images/image-updated.event';

@EventsHandler(ImageUpdatedEvent)
export class ImageUpdatedHandler implements IEventHandler<ImageUpdatedEvent> {
  async handle(event: ImageUpdatedEvent) {
    const { image } = event;
    Logger.log(`#${image.id} - updated!`, ImageUpdatedHandler.name);
    return event;
  }
}
