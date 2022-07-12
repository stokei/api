import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreateCartItemService } from '.';

describe('CreateCartItemService', () => {
  let createCartItemService: CreateCartItemService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateCartItemService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createCartItemService = modRef.get(CreateCartItemService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createCartItemService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
