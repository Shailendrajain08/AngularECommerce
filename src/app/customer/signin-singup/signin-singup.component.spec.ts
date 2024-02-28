import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninSingupComponent } from './signin-singup.component';

describe('SigninSingupComponent', () => {
  let component: SigninSingupComponent;
  let fixture: ComponentFixture<SigninSingupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SigninSingupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SigninSingupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
