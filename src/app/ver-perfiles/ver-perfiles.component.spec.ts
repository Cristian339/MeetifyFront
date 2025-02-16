import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VerPerfilesComponent } from './ver-perfiles.component';

describe('VerPerfilesComponent', () => {
  let component: VerPerfilesComponent;
  let fixture: ComponentFixture<VerPerfilesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [VerPerfilesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VerPerfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
