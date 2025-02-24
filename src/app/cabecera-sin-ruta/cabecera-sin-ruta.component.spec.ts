import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CabeceraSinRutaComponent } from './cabecera-sin-ruta.component';

describe('CabeceraSinRutaComponent', () => {
  let component: CabeceraSinRutaComponent;
  let fixture: ComponentFixture<CabeceraSinRutaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CabeceraSinRutaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CabeceraSinRutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
