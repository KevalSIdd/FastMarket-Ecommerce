import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcheckoutComponent } from './newcheckout.component';

describe('NewcheckoutComponent', () => {
  let component: NewcheckoutComponent;
  let fixture: ComponentFixture<NewcheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewcheckoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewcheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
