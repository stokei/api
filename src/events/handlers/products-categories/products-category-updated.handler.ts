import { ProductsCategoryUpdatedEvent } from '@/events/implements/products-categories/products-category-updated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(ProductsCategoryUpdatedEvent)
export class ProductsCategoryUpdatedHandler
  implements IEventHandler<ProductsCategoryUpdatedEvent>
{
  async handle(event: ProductsCategoryUpdatedEvent) {
    const { productsCategory } = event;
    Logger.log(
      `#${productsCategory.id} - updated!`,
      ProductsCategoryUpdatedHandler.name
    );
    return event;
  }
}
