import { Test, TestingModule } from '@nestjs/testing';
import { GithubOauthService } from './github-oauth.service';

describe('GithubOauthService', () => {
  let service: GithubOauthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GithubOauthService],
    }).compile();

    service = module.get<GithubOauthService>(GithubOauthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
