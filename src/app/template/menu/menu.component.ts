import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public flageliminar = false;
  constructor( public router: Router ) { }

  ngOnInit(): void {
  }

  onVenta() {
    localStorage.setItem('flageliminar', JSON.stringify(this.flageliminar));
    this.router.navigate(['ingresarventa']);

  }

}
