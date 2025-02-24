import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PerfilAjenoComponent } from './perfil-ajeno.component';

describe('PerfilAjenoComponent', () => {
  let component: PerfilAjenoComponent;
  let fixture: ComponentFixture<PerfilAjenoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PerfilAjenoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilAjenoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
