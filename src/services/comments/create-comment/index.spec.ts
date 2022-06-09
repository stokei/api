import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreateCommentService } from '.';

describe('CreateCommentService', () => {
  let createCommentService: CreateCommentService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateCommentService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createCommentService = modRef.get(CreateCommentService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createCommentService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
