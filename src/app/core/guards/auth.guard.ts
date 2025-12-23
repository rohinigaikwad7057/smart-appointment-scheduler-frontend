import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { Injectable } from "@angular/core";
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  private checkAccess(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    const token = this.auth.getToken();
    const role = this.auth.getRole();

    // 🔥 FIX: read role from parent if child
    const expectedRole =
      route.data?.['role'] || route.parent?.data?.['role'];

    if (!token) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: state.url }
      });
      return false;
    }

    if (expectedRole && role !== expectedRole) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkAccess(route, state);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkAccess(route, state);
  }
}
