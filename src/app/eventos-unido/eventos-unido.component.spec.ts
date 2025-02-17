import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EventosUnidoComponent } from './eventos-unido.component';

describe('EventosUnidoComponent', () => {
  let component: EventosUnidoComponent;
  let fixture: ComponentFixture<EventosUnidoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [EventosUnidoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventosUnidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
