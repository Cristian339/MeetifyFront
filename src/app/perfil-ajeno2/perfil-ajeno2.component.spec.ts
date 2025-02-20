import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PerfilAjeno2Component } from './perfil-ajeno2.component';

describe('PerfilAjeno2Component', () => {
  let component: PerfilAjeno2Component;
  let fixture: ComponentFixture<PerfilAjeno2Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PerfilAjeno2Component],
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilAjeno2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
