import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreateCheckoutsCurrencyService } from '.';

describe('CreateCheckoutsCurrencyService', () => {
  let createCheckoutsCurrencyService: CreateCheckoutsCurrencyService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateCheckoutsCurrencyService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createCheckoutsCurrencyService = modRef.get(CreateCheckoutsCurrencyService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createCheckoutsCurrencyService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
