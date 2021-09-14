import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibreroComponent } from './librero.component';

describe('LibreroComponent', () => {
  let component: LibreroComponent;
  let fixture: ComponentFixture<LibreroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibreroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibreroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
