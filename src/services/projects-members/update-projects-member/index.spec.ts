import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { UpdateProjectsMemberService } from '.';

describe('UpdateProjectsMemberService', () => {
  let updateProjectsMemberService: UpdateProjectsMemberService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateProjectsMemberService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateProjectsMemberService = modRef.get(UpdateProjectsMemberService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateProjectsMemberService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
