import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ImageCreatedEvent } from '@/events/implements/images/image-created.event';

@EventsHandler(ImageCreatedEvent)
export class ImageCreatedHandler implements IEventHandler<ImageCreatedEvent> {
  async handle(event: ImageCreatedEvent) {
    const { image } = event;
    Logger.log(`#${image.id} - created!`, ImageCreatedHandler.name);
    return event;
  }
}
