import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ProductCreatedEvent } from '@/events/implements/products/product-created.event';

@EventsHandler(ProductCreatedEvent)
export class ProductCreatedHandler
  implements IEventHandler<ProductCreatedEvent>
{
  async handle(event: ProductCreatedEvent) {
    const { product } = event;
    Logger.log(`#${product.id} - created!`, ProductCreatedHandler.name);
    return event;
  }
}
