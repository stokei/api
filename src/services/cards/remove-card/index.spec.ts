import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { RemoveCardService } from '.';

describe('RemoveCardService', () => {
  let removeCardService: RemoveCardService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveCardService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeCardService = modRef.get(RemoveCardService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeCardService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
