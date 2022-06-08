import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { UpdateQuestionService } from '.';

describe('UpdateQuestionService', () => {
  let updateQuestionService: UpdateQuestionService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateQuestionService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateQuestionService = modRef.get(UpdateQuestionService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateQuestionService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
