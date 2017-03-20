import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessoQueueItemComponent } from './processo-queue-item.component';

describe('ProcessoQueueItemComponent', () => {
  let component: ProcessoQueueItemComponent;
  let fixture: ComponentFixture<ProcessoQueueItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessoQueueItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessoQueueItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
