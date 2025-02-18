import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MisReseniasComponent } from './mis-resenias.component';

describe('MisReseniasComponent', () => {
  let component: MisReseniasComponent;
  let fixture: ComponentFixture<MisReseniasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MisReseniasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MisReseniasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
