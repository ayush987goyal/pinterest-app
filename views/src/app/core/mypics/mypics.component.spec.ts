import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MypicsComponent } from './mypics.component';

describe('MypicsComponent', () => {
  let component: MypicsComponent;
  let fixture: ComponentFixture<MypicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MypicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
