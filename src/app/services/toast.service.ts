import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  async presentToast(message: string, type: 'success' | 'error' | 'warning' = 'success') {
    const colors = {
      success: 'success',
      error: 'danger',
      warning: 'warning'
    };

    const emojis = {
      success: '✅',
      error: '❌',
      warning: '⚠️'
    };

    const duration: number = 3000;

    const toast = await this.toastController.create({
      message: `${emojis[type]} ${message}`,
      duration,
      position: 'bottom',
      color: colors[type] || 'primary',
    });

    await toast.present();
  }
}
