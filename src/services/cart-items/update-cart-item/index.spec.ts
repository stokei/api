import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UpdateCartItemService } from '.';

describe('UpdateCartItemService', () => {
  let updateCartItemService: UpdateCartItemService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateCartItemService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateCartItemService = modRef.get(UpdateCartItemService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateCartItemService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
