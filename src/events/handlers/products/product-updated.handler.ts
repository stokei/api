import { ProductUpdatedEvent } from '@/events/implements/products/product-updated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(ProductUpdatedEvent)
export class ProductUpdatedHandler
  implements IEventHandler<ProductUpdatedEvent>
{
  async handle(event: ProductUpdatedEvent) {
    const { product } = event;
    Logger.log(`#${product.id} - updated!`, ProductUpdatedHandler.name);
    return event;
  }
}
