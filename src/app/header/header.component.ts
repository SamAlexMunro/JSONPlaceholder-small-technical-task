import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  mobileMenu = false;

  constructor() { }

  ngOnInit() {
  }

  toggleMobileMenu(): void {
    this.mobileMenu = !this.mobileMenu;
  }
}
