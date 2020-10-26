import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhitelistCarComponent } from './whitelist-car.component';

describe('WhitelistCarComponent', () => {
  let component: WhitelistCarComponent;
  let fixture: ComponentFixture<WhitelistCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhitelistCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhitelistCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
