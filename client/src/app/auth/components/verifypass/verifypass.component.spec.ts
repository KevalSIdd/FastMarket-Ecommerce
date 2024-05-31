import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifypassComponent } from './verifypass.component';

describe('VerifypassComponent', () => {
  let component: VerifypassComponent;
  let fixture: ComponentFixture<VerifypassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [VerifypassComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifypassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
