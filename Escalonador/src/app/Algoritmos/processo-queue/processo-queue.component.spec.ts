import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessoQueueComponent } from './processo-queue.component';

describe('ProcessoQueueComponent', () => {
  let component: ProcessoQueueComponent;
  let fixture: ComponentFixture<ProcessoQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessoQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessoQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
