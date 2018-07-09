import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { EngagementList } from '../engagement-list/engagement.list.component';

describe('EngagementList Component', () => {
  let component: EngagementList;
  let fixture: ComponentFixture<EngagementList>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({      
      declarations: [
        EngagementList
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(EngagementList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create engagement list component', () => {
    expect(component).toBeTruthy();
  }); 
});