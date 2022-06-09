import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreatePriceService } from '.';

describe('CreatePriceService', () => {
  let createPriceService: CreatePriceService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreatePriceService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createPriceService = modRef.get(CreatePriceService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createPriceService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
