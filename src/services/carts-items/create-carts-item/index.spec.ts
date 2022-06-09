import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreateCartsItemService } from '.';

describe('CreateCartsItemService', () => {
  let createCartsItemService: CreateCartsItemService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateCartsItemService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createCartsItemService = modRef.get(CreateCartsItemService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createCartsItemService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
