import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciadorMemoriaComponent } from './gerenciador-memoria.component';

describe('GerenciadorMemoriaComponent', () => {
  let component: GerenciadorMemoriaComponent;
  let fixture: ComponentFixture<GerenciadorMemoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerenciadorMemoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciadorMemoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
