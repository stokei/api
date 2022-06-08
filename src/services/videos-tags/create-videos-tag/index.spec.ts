import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { CreateVideosTagService } from '.';

describe('CreateVideosTagService', () => {
  let createVideosTagService: CreateVideosTagService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateVideosTagService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createVideosTagService = modRef.get(CreateVideosTagService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createVideosTagService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
