import { ProductsTagCreatedEvent } from '@/events/implements/products-tags/products-tag-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(ProductsTagCreatedEvent)
export class ProductsTagCreatedHandler
  implements IEventHandler<ProductsTagCreatedEvent>
{
  async handle(event: ProductsTagCreatedEvent) {
    const { productsTag } = event;
    Logger.log(`#${productsTag.id} - created!`, ProductsTagCreatedHandler.name);
    return event;
  }
}
