import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestFitComponent } from './best-fit.component';

describe('BestFitComponent', () => {
  let component: BestFitComponent;
  let fixture: ComponentFixture<BestFitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestFitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestFitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
