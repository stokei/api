import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { RemoveVersionService } from '.';

describe('RemoveVersionService', () => {
  let removeVersionService: RemoveVersionService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveVersionService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeVersionService = modRef.get(RemoveVersionService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeVersionService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
