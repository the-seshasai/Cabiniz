import { Injectable, Inject, Optional } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlSegment,
  Router,
} from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { TokenService } from './token.service';

const LOGIN_URL = '/auth/login';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard  {
  private _gotoLogin(url?: string) {
    setTimeout(() => {
      if (/^https?:\/\//g.test(url!)) {
        this._document.location.href = url as string;
      } else {
        this._router.navigateByUrl(url);
      }
    });
  }

  private _checkJWT(model: any, offset?: number): boolean {
    return !!model?.token;
  }

//   private _process(): boolean {
//     const res = this._checkJWT(this._token.get<any>(), 1000);
//     if (!res) {
//       this._gotoLogin(LOGIN_URL);
//     }
//     return res;
//   }

  constructor(
    private _router: Router,
    private _token: TokenService,
    @Optional() @Inject(DOCUMENT) private _document: any
  ) {}

  
}
