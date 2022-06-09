import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { RemoveQuestionService } from '.';

describe('RemoveQuestionService', () => {
  let removeQuestionService: RemoveQuestionService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveQuestionService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeQuestionService = modRef.get(RemoveQuestionService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeQuestionService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
