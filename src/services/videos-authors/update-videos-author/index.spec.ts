import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { UpdateVideosAuthorService } from '.';

describe('UpdateVideosAuthorService', () => {
  let updateVideosAuthorService: UpdateVideosAuthorService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateVideosAuthorService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateVideosAuthorService = modRef.get(UpdateVideosAuthorService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateVideosAuthorService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
