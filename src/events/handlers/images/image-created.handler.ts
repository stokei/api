import { ImageCreatedEvent } from '@/events/implements/images/image-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(ImageCreatedEvent)
export class ImageCreatedHandler implements IEventHandler<ImageCreatedEvent> {
  async handle(event: ImageCreatedEvent) {
    const { image } = event;
    Logger.log(`#${image.id} - created!`, ImageCreatedHandler.name);
    return event;
  }
}
