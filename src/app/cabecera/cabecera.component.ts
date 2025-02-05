import { Component, OnInit, Input } from '@angular/core';
import { arrowBackCircle } from "ionicons/icons";
import { addIcons } from "ionicons";
import { IonicModule } from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ]
})
export class CabeceraComponent implements OnInit {
  @Input() titulo: string = 'NAVBAR';
  @Input() backRoute: string | undefined;

  constructor(private router: Router) {
    addIcons({ arrowBackCircle });
  }
  navigateBack() {
    if (this.backRoute) {
      this.router.navigate([this.backRoute]);
    }
  }

  ngOnInit() {}
}
