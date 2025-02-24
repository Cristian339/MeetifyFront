import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UsuPubliComponent } from './usu-publi.component';

describe('UsuPubliComponent', () => {
  let component: UsuPubliComponent;
  let fixture: ComponentFixture<UsuPubliComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [UsuPubliComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsuPubliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
