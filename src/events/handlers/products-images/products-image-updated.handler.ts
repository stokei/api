import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ProductsImageUpdatedEvent } from '@/events/implements/products-images/products-image-updated.event';

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
