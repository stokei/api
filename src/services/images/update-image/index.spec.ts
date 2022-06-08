import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { UpdateImageService } from '.';

describe('UpdateImageService', () => {
  let updateImageService: UpdateImageService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateImageService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateImageService = modRef.get(UpdateImageService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateImageService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
