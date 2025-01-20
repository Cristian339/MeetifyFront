import { Component, OnInit } from '@angular/core';
import {AnimationController, IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {arrowBackCircle, personCircle, chatbubblesOutline} from "ionicons/icons";
import {addIcons} from "ionicons";

@Component({
  selector: 'app-mensajeria',
  templateUrl: './mensajeria.component.html',
  styleUrls: ['./mensajeria.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
  ]
})
export class MensajeriaComponent {

  constructor(private animationCtrl: AnimationController) {

    addIcons( { arrowBackCircle, personCircle, chatbubblesOutline } );
  }

  entrarAnimacion = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root!.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root!.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  dejarAnimacion = (baseEl: HTMLElement) => {
    return this.entrarAnimacion(baseEl).direction('reverse');
  };

}
