import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { RemoveKeywordService } from '.';

describe('RemoveKeywordService', () => {
  let removeKeywordService: RemoveKeywordService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveKeywordService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeKeywordService = modRef.get(RemoveKeywordService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeKeywordService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
