import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualTerminalComponent } from './virtual-terminal.component';

describe('VirtualTerminalComponent', () => {
  let component: VirtualTerminalComponent;
  let fixture: ComponentFixture<VirtualTerminalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualTerminalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualTerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
