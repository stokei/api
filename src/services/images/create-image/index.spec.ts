import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { CreateImageService } from '.';

describe('CreateImageService', () => {
  let createImageService: CreateImageService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateImageService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createImageService = modRef.get(CreateImageService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createImageService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
