import { BadRequestException } from '@nestjs/common';

export class ParamNotFoundException<
  TParamName extends string
> extends BadRequestException {
  constructor(paramName?: TParamName) {
    super(paramName ? `${paramName}NotFound` : 'paramNotFound');
  }
}
