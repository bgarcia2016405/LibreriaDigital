import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-librero',
  templateUrl: './librero.component.html',
  styleUrls: ['./librero.component.scss']
})
export class LibreroComponent implements OnInit {
  public libros;

  constructor() { }

  ngOnInit(): void {
    this.libros = [10,50,50,50,50,50,50,50,5050,5]
    console.log(this.libros)

  }

}
