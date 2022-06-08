import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { RemoveImageService } from '.';

describe('RemoveImageService', () => {
  let removeImageService: RemoveImageService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveImageService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeImageService = modRef.get(RemoveImageService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeImageService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
