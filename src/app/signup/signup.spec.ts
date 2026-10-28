
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Signup } from './signup';
import { provideRouter } from '@angular/router';

describe('Signup', () => {
  let component: Signup;
  let fixture: ComponentFixture<Signup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Signup],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(Signup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the signup component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the signup heading', () => {
    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelector('h1, h2')).toBeTruthy();
  });
});
