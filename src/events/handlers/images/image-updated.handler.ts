import { ImageUpdatedEvent } from '@/events/implements/images/image-updated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(ImageUpdatedEvent)
export class ImageUpdatedHandler implements IEventHandler<ImageUpdatedEvent> {
  async handle(event: ImageUpdatedEvent) {
    const { image } = event;
    Logger.log(`#${image.id} - updated!`, ImageUpdatedHandler.name);
    return event;
  }
}
