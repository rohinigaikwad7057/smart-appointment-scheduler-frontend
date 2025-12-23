import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppointmentDetailsDialogComponent } from './appointment-details-dialog.component';

describe('AppointmentDetailsDialogComponent', () => {
  let component: AppointmentDetailsDialogComponent;
  let fixture: ComponentFixture<AppointmentDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentDetailsDialogComponent, HttpClientTestingModule, NoopAnimationsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { _id: '1', notes: '' } },
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
