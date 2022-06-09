import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreateCurrencyService } from '.';

describe('CreateCurrencyService', () => {
  let createCurrencyService: CreateCurrencyService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateCurrencyService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createCurrencyService = modRef.get(CreateCurrencyService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createCurrencyService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
