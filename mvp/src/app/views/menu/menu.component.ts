import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'; 

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  mostraFormLogin() {
  //to-do: fazer o js funcionar para mostar o modal
    
    $('#exampleModal').modal({ show: true });
  }

  ngOnInit() {
  }

}
