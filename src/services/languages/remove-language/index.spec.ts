import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { RemoveLanguageService } from '.';

describe('RemoveLanguageService', () => {
  let removeLanguageService: RemoveLanguageService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveLanguageService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeLanguageService = modRef.get(RemoveLanguageService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeLanguageService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
