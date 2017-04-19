import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcluidosComponent } from './concluidos.component';

describe('ConcluidosComponent', () => {
  let component: ConcluidosComponent;
  let fixture: ComponentFixture<ConcluidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcluidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcluidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
