import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AudiLog } from './audit-log';

describe('AudiLog', () => {
  let component: AudiLog;
  let fixture: ComponentFixture<AudiLog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AudiLog],
    }).compileComponents();

    fixture = TestBed.createComponent(AudiLog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
