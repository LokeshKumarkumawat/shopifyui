import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {








  navItems: any[] = [
    { text: 'Home', link: '/', icon: 'assets/icons/home.svg', active: true },
    { text: 'My Orders', link: '/myOrders', icon: 'assets/icons/myorder.svg', active: false },
    { text: 'Profile', link: '/user', icon: 'assets/icons/user.svg', active: false },
  ];

  selectNavItem(selectedItem: any): void {
    this.navItems.forEach((item) => item.active = false);
    selectedItem.active = true;
  }
}


