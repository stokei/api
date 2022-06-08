import { ProductsImageUpdatedEvent } from '@/events/implements/products-images/products-image-updated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(ProductsImageUpdatedEvent)
export class ProductsImageUpdatedHandler
  implements IEventHandler<ProductsImageUpdatedEvent>
{
  async handle(event: ProductsImageUpdatedEvent) {
    const { productsImage } = event;
    Logger.log(
      `#${productsImage.id} - updated!`,
      ProductsImageUpdatedHandler.name
    );
    return event;
  }
}
