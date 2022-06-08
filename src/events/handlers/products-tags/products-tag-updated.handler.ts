import { ProductsTagUpdatedEvent } from '@/events/implements/products-tags/products-tag-updated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(ProductsTagUpdatedEvent)
export class ProductsTagUpdatedHandler
  implements IEventHandler<ProductsTagUpdatedEvent>
{
  async handle(event: ProductsTagUpdatedEvent) {
    const { productsTag } = event;
    Logger.log(`#${productsTag.id} - updated!`, ProductsTagUpdatedHandler.name);
    return event;
  }
}
