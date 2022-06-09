import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ProductsCategoryCreatedEvent } from '@/events/implements/products-categories/products-category-created.event';

@EventsHandler(ProductsCategoryCreatedEvent)
export class ProductsCategoryCreatedHandler
  implements IEventHandler<ProductsCategoryCreatedEvent>
{
  async handle(event: ProductsCategoryCreatedEvent) {
    const { productsCategory } = event;
    Logger.log(
      `#${productsCategory.id} - created!`,
      ProductsCategoryCreatedHandler.name
    );
    return event;
  }
}
