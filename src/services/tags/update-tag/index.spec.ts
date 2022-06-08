import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { UpdateTagService } from '.';

describe('UpdateTagService', () => {
  let updateTagService: UpdateTagService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateTagService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateTagService = modRef.get(UpdateTagService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateTagService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
