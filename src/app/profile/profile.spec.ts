
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Profile } from './profile';
import { provideRouter } from '@angular/router';

describe('Profile', () => {
  let component: Profile;
  let fixture: ComponentFixture<Profile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Profile],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(Profile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the profile component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the profile heading', () => {
    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelector('h1, h2')).toBeTruthy();
  });
});
