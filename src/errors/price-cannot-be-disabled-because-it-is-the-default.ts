import { BadRequestException } from '@nestjs/common';

export class PriceCannotBeDisabledBecauseItIsTheDefaultException extends BadRequestException {
  constructor() {
    super('priceCannotBeDisabledBecauseItIsTheDefault');
  }
}
