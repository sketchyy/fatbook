import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cd-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  links  = ['First', 'Second', 'Third'];
  activeLink = this.links[0];

  ngOnInit( ) {

  }



}
