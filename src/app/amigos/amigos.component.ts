import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {IonicModule} from "@ionic/angular";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-amigos',
  templateUrl: './amigos.component.html',
  imports: [
    IonicModule,
    NgForOf
  ],
  styleUrls: ['./amigos.component.scss']
})
export class AmigosComponent implements OnInit {
  amigos: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchAmigos();
  }

  fetchAmigos() {
    this.http.get<any[]>('https://api.example.com/amigos')
      .subscribe(data => {
        this.amigos = data;
      });
  }
}
