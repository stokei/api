import { Test } from '@nestjs/testing';

import { CountProjectsMembersRepository } from '@/repositories/projects-members/count-projects-members';
import { FindAllProjectsMembersRepository } from '@/repositories/projects-members/find-all-projects-members';

import { FindAllProjectsMembersQueryHandler } from '.';

describe('FindAllProjectsMembersQueryHandler', () => {
  let findAllProjectsMembersRepository: FindAllProjectsMembersRepository;
  let findAllProjectsMembersQueryHandler: FindAllProjectsMembersQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllProjectsMembersRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountProjectsMembersRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllProjectsMembersQueryHandler
      ]
    }).compile();

    findAllProjectsMembersRepository = moduleRef.get(
      FindAllProjectsMembersRepository
    );
    findAllProjectsMembersQueryHandler = moduleRef.get(
      FindAllProjectsMembersQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllProjectsMembersQueryHandler).toBeDefined();
    expect(findAllProjectsMembersRepository).toBeDefined();
  });
});
