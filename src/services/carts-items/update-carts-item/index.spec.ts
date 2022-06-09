import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UpdateCartsItemService } from '.';

describe('UpdateCartsItemService', () => {
  let updateCartsItemService: UpdateCartsItemService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateCartsItemService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateCartsItemService = modRef.get(UpdateCartsItemService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateCartsItemService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
