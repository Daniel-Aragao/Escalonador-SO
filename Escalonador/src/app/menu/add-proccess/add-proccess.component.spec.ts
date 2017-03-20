import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProccessComponent } from './add-proccess.component';

describe('AddProccessComponent', () => {
  let component: AddProccessComponent;
  let fixture: ComponentFixture<AddProccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
