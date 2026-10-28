
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApartmentDetails } from './apartmentdetails';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';

describe('ApartmentDetails', () => {
  let component: ApartmentDetails;
  let fixture: ComponentFixture<ApartmentDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApartmentDetails],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '1' }),
            paramMap: of({
              get: (key: string) => key === 'id' ? '1' : null
            }),
            snapshot: {
              paramMap: {
                get: (key: string) => key === 'id' ? '1' : null
              },
              params: { id: '1' }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ApartmentDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the apartment details component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the apartment details page', () => {
    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelector('h1, h2')).toBeTruthy();
  });
});
