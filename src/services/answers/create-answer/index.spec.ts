import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreateAnswerService } from '.';

describe('CreateAnswerService', () => {
  let createAnswerService: CreateAnswerService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateAnswerService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createAnswerService = modRef.get(CreateAnswerService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createAnswerService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
