import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UpdateCurrencyService } from '.';

describe('UpdateCurrencyService', () => {
  let updateCurrencyService: UpdateCurrencyService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateCurrencyService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateCurrencyService = modRef.get(UpdateCurrencyService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateCurrencyService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
