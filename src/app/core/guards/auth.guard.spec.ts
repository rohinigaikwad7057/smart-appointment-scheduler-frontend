import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let mockAuth: any;
  let routerSpy: any;

  beforeEach(() => {
    mockAuth = { getToken: () => '', getRole: () => null };
    routerSpy = { navigate: jasmine.createSpy('navigate') } as any;
    guard = new AuthGuard(mockAuth, routerSpy as Router);
  });

  it('redirects to login when not authenticated', () => {
    const can = guard.canActivate({} as any, { url: '/patient/dashboard' } as any);
    expect(can).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalled();
  });
});
