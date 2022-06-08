import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { RemoveAnswerService } from '.';

describe('RemoveAnswerService', () => {
  let removeAnswerService: RemoveAnswerService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveAnswerService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeAnswerService = modRef.get(RemoveAnswerService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeAnswerService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
