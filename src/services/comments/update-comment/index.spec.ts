import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UpdateCommentService } from '.';

describe('UpdateCommentService', () => {
  let updateCommentService: UpdateCommentService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateCommentService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateCommentService = modRef.get(UpdateCommentService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateCommentService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
