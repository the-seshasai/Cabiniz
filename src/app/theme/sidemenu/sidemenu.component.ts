import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { MenuService } from '@core';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
})
export class SidemenuComponent {
  // NOTE: Ripple effect make page flashing on mobile
  @Input() ripple = false;

  RoleAccessForm = this.fb.group({
    AccessList: this.fb.array([
      this.fb.group({
        ModName: [],
        RoleId:[]
      }) 
    ]),
  });
  menus:any;
  // menus = this._menu.getAll();

  constructor(private _menu: MenuService,private fb:FormBuilder) {}

  ngOnInit() {
    // alert('hai');
debugger;
    const AccessControls = <FormArray>this.AccessList_Control;
    for (let i = AccessControls.length - 1; i >= 0; i--) {
     AccessControls.removeAt(0);
   }

   debugger;
this._menu.Get_MenuList(localStorage.getItem('CompId'),localStorage.getItem('roleId')).subscribe(res => {
  console.log(res);
res.forEach(element=>
{
this.AccessList_Control.push(
  this.fb.group({              
    ModName: ['menu.' + element.ModName.toLowerCase()],
    RoleId: [element.RoleId],
          
  })          
);
console.log("menu");
console.log(this.AccessList_Control.value);
})

console.log(this.AccessList_Control as FormArray);
  // this.RoleId=res[0].RoleId;
  // this.Main_MenuName=res[0].MainMenuName;
  
  if(res)
  {
    this.menus=this._menu.getAll();
  }
});

  }

  // Delete empty values and rebuild route
  buildRoute(routes: string[]) {
    let route = '';
    routes.forEach(item => {
      if (item && item.trim()) {
        route += '/' + item.replace(/^\/+|\/+$/g, '');
      }
    });
    return route;
  }
  get AccessList_Control() {
    return this.RoleAccessForm.get('AccessList') as FormArray; // New  code added
  }
}
