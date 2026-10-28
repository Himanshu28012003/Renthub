import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApartmentDetails } from './apartmentdetails';
// import {Apartment}

describe('Apartmentdetails', () => {
  let component: ApartmentDetails;
  let fixture: ComponentFixture<ApartmentDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApartmentDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(ApartmentDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
