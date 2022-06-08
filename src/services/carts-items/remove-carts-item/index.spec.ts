import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { RemoveCartsItemService } from '.';

describe('RemoveCartsItemService', () => {
  let removeCartsItemService: RemoveCartsItemService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveCartsItemService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeCartsItemService = modRef.get(RemoveCartsItemService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeCartsItemService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
