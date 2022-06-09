import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UpdateKeywordService } from '.';

describe('UpdateKeywordService', () => {
  let updateKeywordService: UpdateKeywordService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateKeywordService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateKeywordService = modRef.get(UpdateKeywordService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateKeywordService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
