import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverReservationsComponent } from './driver-reservations.component';

describe('DriverReservationsComponent', () => {
  let component: DriverReservationsComponent;
  let fixture: ComponentFixture<DriverReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverReservationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
