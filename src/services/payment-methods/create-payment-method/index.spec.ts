import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreatePaymentMethodService } from '.';

describe('CreatePaymentMethodService', () => {
  let createPaymentMethodService: CreatePaymentMethodService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreatePaymentMethodService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createPaymentMethodService = modRef.get(CreatePaymentMethodService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createPaymentMethodService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
