import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { UpdateAccessService } from '.';

describe('UpdateAccessService', () => {
  let updateAccessService: UpdateAccessService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateAccessService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateAccessService = modRef.get(UpdateAccessService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateAccessService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
