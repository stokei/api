import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { RemoveOrdersItemService } from '.';

describe('RemoveOrdersItemService', () => {
  let removeOrdersItemService: RemoveOrdersItemService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveOrdersItemService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeOrdersItemService = modRef.get(RemoveOrdersItemService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeOrdersItemService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
