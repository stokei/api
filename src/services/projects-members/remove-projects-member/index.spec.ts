import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { RemoveProjectsMemberService } from '.';

describe('RemoveProjectsMemberService', () => {
  let removeProjectsMemberService: RemoveProjectsMemberService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveProjectsMemberService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeProjectsMemberService = modRef.get(RemoveProjectsMemberService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeProjectsMemberService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
