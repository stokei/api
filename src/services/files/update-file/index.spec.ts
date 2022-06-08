import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { UpdateFileService } from '.';

describe('UpdateFileService', () => {
  let updateFileService: UpdateFileService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateFileService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateFileService = modRef.get(UpdateFileService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateFileService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
