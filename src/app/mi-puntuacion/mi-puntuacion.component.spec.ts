import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MiPuntuacionComponent } from './mi-puntuacion.component';

describe('MiPuntuacionComponent', () => {
  let component: MiPuntuacionComponent;
  let fixture: ComponentFixture<MiPuntuacionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MiPuntuacionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MiPuntuacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
