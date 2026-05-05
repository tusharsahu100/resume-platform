import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { GithubRepoStats } from '../models/project.model';

interface CacheEntry {
  data: GithubRepoStats;
  timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private cache = new Map<string, CacheEntry>();
  private inFlight = new Map<string, Observable<GithubRepoStats | null>>();
  private readonly CACHE_DURATION = 3600000; // 1 hour in milliseconds
  private readonly API_BASE = 'https://api.github.com/repos';

  constructor(private http: HttpClient) {}

  getRepoStats(owner: string, repo: string): Observable<GithubRepoStats | null> {
    // Input validation
    if (!owner || !repo || owner.includes('/') || repo.includes('/')) {
      return of(null);
    }

    const cacheKey = `${owner}/${repo}`;
    const cached = this.cache.get(cacheKey);

    // Return cached data if still valid
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return of(cached.data);
    }

    // Return in-flight request if exists
    const inFlight = this.inFlight.get(cacheKey);
    if (inFlight) {
      return inFlight;
    }

    // Fetch from API
    const request$ = this.http.get<GithubRepoStats>(`${this.API_BASE}/${owner}/${repo}`).pipe(
      tap(data => {
        this.cache.set(cacheKey, {
          data,
          timestamp: Date.now()
        });
        this.inFlight.delete(cacheKey);
      }),
      catchError(error => {
        console.warn(`Failed to fetch GitHub stats for ${cacheKey}:`, error);
        this.inFlight.delete(cacheKey);
        return of(null);
      }),
      shareReplay(1)
    );

    this.inFlight.set(cacheKey, request$);
    return request$;
  }

  clearCache(): void {
    this.cache.clear();
  }
}
