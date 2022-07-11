import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { RemovePaymentMethodService } from '.';

describe('RemovePaymentMethodService', () => {
  let removePaymentMethodService: RemovePaymentMethodService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemovePaymentMethodService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removePaymentMethodService = modRef.get(RemovePaymentMethodService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removePaymentMethodService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
