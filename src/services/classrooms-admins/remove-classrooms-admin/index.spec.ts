import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { RemoveClassroomsAdminService } from '.';

describe('RemoveClassroomsAdminService', () => {
  let removeClassroomsAdminService: RemoveClassroomsAdminService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveClassroomsAdminService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeClassroomsAdminService = modRef.get(RemoveClassroomsAdminService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeClassroomsAdminService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
