import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { GithubService } from './github.service';
import { GithubRepoStats } from '../models/project.model';

describe('GithubService', () => {
  let service: GithubService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GithubService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(GithubService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch repo stats from GitHub API', (done) => {
    const mockStats: GithubRepoStats = {
      stargazers_count: 100,
      forks_count: 25,
      language: 'TypeScript',
      updated_at: '2026-04-01T00:00:00Z'
    };

    service.getRepoStats('testuser', 'testrepo').subscribe(stats => {
      expect(stats?.stargazers_count).toBe(100);
      expect(stats?.forks_count).toBe(25);
      expect(stats?.language).toBe('TypeScript');
      done();
    });

    const req = httpMock.expectOne('https://api.github.com/repos/testuser/testrepo');
    expect(req.request.method).toBe('GET');
    req.flush(mockStats);
  });

  it('should cache repo stats for 1 hour', (done) => {
    const mockStats: GithubRepoStats = {
      stargazers_count: 100,
      forks_count: 25,
      language: 'TypeScript',
      updated_at: '2026-04-01T00:00:00Z'
    };

    // First call - should hit API
    service.getRepoStats('testuser', 'testrepo').subscribe();
    const req1 = httpMock.expectOne('https://api.github.com/repos/testuser/testrepo');
    req1.flush(mockStats);

    // Second call immediately after - should use cache
    service.getRepoStats('testuser', 'testrepo').subscribe(stats => {
      expect(stats?.stargazers_count).toBe(100);
      done();
    });

    // No second HTTP request should be made
    httpMock.expectNone('https://api.github.com/repos/testuser/testrepo');
  });

  it('should handle API errors gracefully', (done) => {
    service.getRepoStats('testuser', 'testrepo').subscribe(stats => {
      expect(stats).toBeNull();
      done();
    });

    const req = httpMock.expectOne('https://api.github.com/repos/testuser/testrepo');
    req.error(new ProgressEvent('error'));
  });

  it('should return null for invalid owner parameter', (done) => {
    service.getRepoStats('', 'testrepo').subscribe(stats => {
      expect(stats).toBeNull();
      done();
    });

    httpMock.expectNone('https://api.github.com/repos//testrepo');
  });

  it('should return null for invalid repo parameter', (done) => {
    service.getRepoStats('testuser', '').subscribe(stats => {
      expect(stats).toBeNull();
      done();
    });

    httpMock.expectNone('https://api.github.com/repos/testuser/');
  });

  it('should return null for owner containing slash', (done) => {
    service.getRepoStats('test/user', 'testrepo').subscribe(stats => {
      expect(stats).toBeNull();
      done();
    });

    httpMock.expectNone('https://api.github.com/repos/test/user/testrepo');
  });

  it('should return null for repo containing slash', (done) => {
    service.getRepoStats('testuser', 'test/repo').subscribe(stats => {
      expect(stats).toBeNull();
      done();
    });

    httpMock.expectNone('https://api.github.com/repos/testuser/test/repo');
  });

  it('should deduplicate concurrent requests', (done) => {
    const mockStats: GithubRepoStats = {
      stargazers_count: 100,
      forks_count: 25,
      language: 'TypeScript',
      updated_at: '2026-04-01T00:00:00Z'
    };

    let completed = 0;
    const checkCompletion = () => {
      completed++;
      if (completed === 2) {
        done();
      }
    };

    // Make two concurrent calls
    service.getRepoStats('testuser', 'testrepo').subscribe(stats => {
      expect(stats?.stargazers_count).toBe(100);
      checkCompletion();
    });

    service.getRepoStats('testuser', 'testrepo').subscribe(stats => {
      expect(stats?.stargazers_count).toBe(100);
      checkCompletion();
    });

    // Only one HTTP request should be made
    const req = httpMock.expectOne('https://api.github.com/repos/testuser/testrepo');
    req.flush(mockStats);
    httpMock.expectNone('https://api.github.com/repos/testuser/testrepo');
  });

  it('should clear cache when clearCache is called', (done) => {
    const mockStats: GithubRepoStats = {
      stargazers_count: 100,
      forks_count: 25,
      language: 'TypeScript',
      updated_at: '2026-04-01T00:00:00Z'
    };

    // First call - should hit API
    service.getRepoStats('testuser', 'testrepo').subscribe();
    const req1 = httpMock.expectOne('https://api.github.com/repos/testuser/testrepo');
    req1.flush(mockStats);

    // Clear cache
    service.clearCache();

    // Second call after clearing cache - should hit API again
    service.getRepoStats('testuser', 'testrepo').subscribe(stats => {
      expect(stats?.stargazers_count).toBe(100);
      done();
    });

    const req2 = httpMock.expectOne('https://api.github.com/repos/testuser/testrepo');
    req2.flush(mockStats);
  });

  it('should handle null language from GitHub API', (done) => {
    const mockStats: GithubRepoStats = {
      stargazers_count: 50,
      forks_count: 10,
      language: null,
      updated_at: '2026-04-01T00:00:00Z'
    };

    service.getRepoStats('testuser', 'testrepo').subscribe(stats => {
      expect(stats?.language).toBeNull();
      done();
    });

    const req = httpMock.expectOne('https://api.github.com/repos/testuser/testrepo');
    req.flush(mockStats);
  });
});
