import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewsModalComponent } from './add-news-modal.component';

describe('AddNewsModalComponent', () => {
  let component: AddNewsModalComponent;
  let fixture: ComponentFixture<AddNewsModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewsModalComponent]
    });
    fixture = TestBed.createComponent(AddNewsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
