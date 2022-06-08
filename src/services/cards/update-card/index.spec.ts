import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { UpdateCardService } from '.';

describe('UpdateCardService', () => {
  let updateCardService: UpdateCardService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateCardService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateCardService = modRef.get(UpdateCardService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateCardService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
