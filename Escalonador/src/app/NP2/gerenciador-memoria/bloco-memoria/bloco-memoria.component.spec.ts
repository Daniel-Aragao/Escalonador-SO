import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocoMemoriaComponent } from './bloco-memoria.component';

describe('BlocoMemoriaComponent', () => {
  let component: BlocoMemoriaComponent;
  let fixture: ComponentFixture<BlocoMemoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlocoMemoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocoMemoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
