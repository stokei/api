import { CategoryUpdatedEvent } from '@/events/implements/categories/category-updated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(CategoryUpdatedEvent)
export class CategoryUpdatedHandler
  implements IEventHandler<CategoryUpdatedEvent>
{
  async handle(event: CategoryUpdatedEvent) {
    const { category } = event;
    Logger.log(`#${category.id} - updated!`, CategoryUpdatedHandler.name);
    return event;
  }
}
