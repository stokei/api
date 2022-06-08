import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { RemoveProjectService } from '.';

describe('RemoveProjectService', () => {
  let removeProjectService: RemoveProjectService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveProjectService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeProjectService = modRef.get(RemoveProjectService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeProjectService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
