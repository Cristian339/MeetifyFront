import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DatosBiograficosComponent } from './datos-biograficos.component';

describe('DatosBiograficosComponent', () => {
  let component: DatosBiograficosComponent;
  let fixture: ComponentFixture<DatosBiograficosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DatosBiograficosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosBiograficosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
