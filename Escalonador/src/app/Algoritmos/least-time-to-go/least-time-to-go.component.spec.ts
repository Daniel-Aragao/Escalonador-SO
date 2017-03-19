/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LeastTimeToGoComponent } from './least-time-to-go.component';

describe('LeastTimeToGoComponent', () => {
  let component: LeastTimeToGoComponent;
  let fixture: ComponentFixture<LeastTimeToGoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeastTimeToGoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeastTimeToGoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
