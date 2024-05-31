import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressmodelComponent } from './addressmodel.component';

describe('AddressmodelComponent', () => {
  let component: AddressmodelComponent;
  let fixture: ComponentFixture<AddressmodelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressmodelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddressmodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
