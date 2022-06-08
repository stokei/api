import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { RemoveVideosAuthorService } from '.';

describe('RemoveVideosAuthorService', () => {
  let removeVideosAuthorService: RemoveVideosAuthorService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveVideosAuthorService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeVideosAuthorService = modRef.get(RemoveVideosAuthorService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeVideosAuthorService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
