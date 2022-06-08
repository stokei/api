import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { CreateVideoService } from '.';

describe('CreateVideoService', () => {
  let createVideoService: CreateVideoService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateVideoService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createVideoService = modRef.get(CreateVideoService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createVideoService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
