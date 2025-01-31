import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  showMenuInferior: boolean = true;

  constructor(private router: Router, private loginService: LoginService) {}
  //
  // ngOnInit() {
  //   this.loginService.authState$.subscribe((isAuthenticated) => {
  //     this.showMenuInferior = isAuthenticated;
  //
  //     if (!isAuthenticated) {
  //       this.router.navigate(['/autentificacion']);
  //     }
  //   });
  // }
}
