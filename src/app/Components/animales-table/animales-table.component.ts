import { Component, OnInit } from '@angular/core';
import { AnimalService } from 'src/app/Services/animal.service';
import { Animal } from 'src/app/Interfaces/animal.interface';
import { Router } from '@angular/router';
const net = require('net');

@Component({
  selector: 'app-animales-table',
  templateUrl: './animales-table.component.html',
  styleUrls: ['./animales-table.component.css']
})
export class AnimalesTableComponent implements OnInit {
  animales?: Animal[];

  constructor(private animalService: AnimalService, private router: Router) { }

  ngOnInit() {
    this.getAnimales();
  }

  getAnimales() {
    this.animalService.getAnimales().subscribe(
      animales => this.animales = animales);
  }

  add() {
    this.router.navigate(['/animales/add']);
  }
}
