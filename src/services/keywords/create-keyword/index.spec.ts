import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { CreateKeywordService } from '.';

describe('CreateKeywordService', () => {
  let createKeywordService: CreateKeywordService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateKeywordService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createKeywordService = modRef.get(CreateKeywordService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createKeywordService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
