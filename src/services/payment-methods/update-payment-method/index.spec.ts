import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UpdatePaymentMethodService } from '.';

describe('UpdatePaymentMethodService', () => {
  let updatePaymentMethodService: UpdatePaymentMethodService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdatePaymentMethodService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updatePaymentMethodService = modRef.get(UpdatePaymentMethodService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updatePaymentMethodService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
