import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { RemoveCommentService } from '.';

describe('RemoveCommentService', () => {
  let removeCommentService: RemoveCommentService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveCommentService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeCommentService = modRef.get(RemoveCommentService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeCommentService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
