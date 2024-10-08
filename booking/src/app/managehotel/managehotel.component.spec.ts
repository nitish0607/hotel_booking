import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagehotelComponent } from './managehotel.component';

describe('ManagehotelComponent', () => {
  let component: ManagehotelComponent;
  let fixture: ComponentFixture<ManagehotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagehotelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagehotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
