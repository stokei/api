import { CategoryRemovedEvent } from '@/events/implements/categories/category-removed.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(CategoryRemovedEvent)
export class CategoryRemovedHandler
  implements IEventHandler<CategoryRemovedEvent>
{
  async handle(event: CategoryRemovedEvent) {
    const { category } = event;
    Logger.log(`#${category.id} - removed!`, CategoryRemovedHandler.name);
    return event;
  }
}
