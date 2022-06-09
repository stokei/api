import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UpdateLanguageService } from '.';

describe('UpdateLanguageService', () => {
  let updateLanguageService: UpdateLanguageService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateLanguageService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateLanguageService = modRef.get(UpdateLanguageService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateLanguageService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
