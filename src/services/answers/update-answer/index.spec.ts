import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { UpdateAnswerService } from '.';

describe('UpdateAnswerService', () => {
  let updateAnswerService: UpdateAnswerService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateAnswerService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateAnswerService = modRef.get(UpdateAnswerService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateAnswerService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
