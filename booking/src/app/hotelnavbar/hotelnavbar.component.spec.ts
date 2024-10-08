import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelnavbarComponent } from './hotelnavbar.component';

describe('HotelnavbarComponent', () => {
  let component: HotelnavbarComponent;
  let fixture: ComponentFixture<HotelnavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelnavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelnavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
