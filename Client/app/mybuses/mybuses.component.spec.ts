import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MybusesComponent } from './mybuses.component';

describe('MybusesComponent', () => {
  let component: MybusesComponent;
  let fixture: ComponentFixture<MybusesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MybusesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MybusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
