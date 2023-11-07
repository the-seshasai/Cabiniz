import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService, TokenService, MenuService } from '@core';

@Component({
  selector: 'app-user',
  template: `
    <button
      mat-button
      class="matero-toolbar-button matero-avatar-button"
      href="javascript:void(0)"
      [matMenuTriggerFor]="menu"
    >
      <img class="matero-avatar" src="assets/images/avatar.jpg" width="32" alt="avatar" />
      <span class="matero-username" fxHide.lt-sm style="color:black;">{{username | titlecase}}</span>
    </button>

    <mat-menu #menu="matMenu">
      <button routerLink="" mat-menu-item>
        <mat-icon>account_circle</mat-icon>
        <span>{{ 'user.profile' | translate }}</span>
      </button>
      
      <button routerLink="/profile/changepassword" mat-menu-item>
      <mat-icon>vpn_key</mat-icon>
      <span>{{ 'user.changepassword' | translate }}</span>
    </button>
    
      <button mat-menu-item (click)="logout()">
        <mat-icon>exit_to_app</mat-icon>
        <span>{{ 'user.logout' | translate }}</span>
      </button>
    </mat-menu>
  `,
})
export class UserComponent {
  username:string;
  constructor(
    private _router: Router,  
    private _settings: SettingsService,
    private _token: TokenService,
    private _menu: MenuService
  ) {
    this.username=localStorage.getItem('username');
  }

  logout() {
    this._token.clear();
    this._settings.removeUser();
    this._menu.reset();
    this._router.navigateByUrl('/auth/login');
    localStorage.clear();
  }
}
