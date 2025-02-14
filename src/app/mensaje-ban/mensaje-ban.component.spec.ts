import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MensajeBanComponent } from './mensaje-ban.component';

describe('MensajeBanComponent', () => {
  let component: MensajeBanComponent;
  let fixture: ComponentFixture<MensajeBanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MensajeBanComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MensajeBanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
