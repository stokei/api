import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { RemoveFileService } from '.';

describe('RemoveFileService', () => {
  let removeFileService: RemoveFileService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveFileService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeFileService = modRef.get(RemoveFileService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeFileService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
