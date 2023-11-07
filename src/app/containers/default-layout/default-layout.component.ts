import {Component} from '@angular/core';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  UserName:string;
  public navItems = navItems;
  currentYear: number = new Date().getFullYear();

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  constructor( 
   
    ) {
      this.UserName=localStorage.getItem('username');
     }

}
