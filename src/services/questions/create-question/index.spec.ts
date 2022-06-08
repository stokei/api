import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { CreateQuestionService } from '.';

describe('CreateQuestionService', () => {
  let createQuestionService: CreateQuestionService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateQuestionService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createQuestionService = modRef.get(CreateQuestionService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createQuestionService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
