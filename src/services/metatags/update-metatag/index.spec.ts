import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { UpdateMetatagService } from '.';

describe('UpdateMetatagService', () => {
  let updateMetatagService: UpdateMetatagService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateMetatagService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateMetatagService = modRef.get(UpdateMetatagService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateMetatagService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
