
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApartmentForm } from './apartment-forms';

describe('ApartmentForms', () => {
  let component: ApartmentForm;
  let fixture: ComponentFixture<ApartmentForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApartmentForm]
    }).compileComponents();

    fixture = TestBed.createComponent(ApartmentForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the apartment form component', () => {
    expect(component).toBeTruthy();
  });

  it('should render a property form', () => {
    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelector('form')).toBeTruthy();
  });
});
