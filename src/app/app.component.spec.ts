import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  
  let appComponent: AppComponent;


  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(()=>{
    const fixture = TestBed.createComponent(AppComponent);
    appComponent = fixture.debugElement.componentInstance;
  })

  it('should create the app', () => {
    expect(appComponent).toBeTruthy();
  });

});
