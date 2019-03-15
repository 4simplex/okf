import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartgraphComponent } from './chartgraph.component';

describe('ChartgraphComponent', () => {
  let component: ChartgraphComponent;
  let fixture: ComponentFixture<ChartgraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartgraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartgraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
