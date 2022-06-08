import { CategoryCreatedEvent } from '@/events/implements/categories/category-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(CategoryCreatedEvent)
export class CategoryCreatedHandler
  implements IEventHandler<CategoryCreatedEvent>
{
  async handle(event: CategoryCreatedEvent) {
    const { category } = event;
    Logger.log(`#${category.id} - created!`, CategoryCreatedHandler.name);
    return event;
  }
}
