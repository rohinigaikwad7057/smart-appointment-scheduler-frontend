import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ManageTreatmentsComponent } from './manage-treatments.component';

describe('ManageTreatmentsComponent', () => {
  let component: ManageTreatmentsComponent;
  let fixture: ComponentFixture<ManageTreatmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageTreatmentsComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageTreatmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
