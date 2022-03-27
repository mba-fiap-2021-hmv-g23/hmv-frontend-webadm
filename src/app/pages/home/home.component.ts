import { Component, OnInit } from '@angular/core';
import {
  Patient,
  PatientService,
  QueueCall,
  QueueCalls,
} from 'src/app/services/patient.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  userName: string = '';
  queUeCalls: QueueCall[] = [];
  patients: Patient[] = [];
  selectedQueueCall!: QueueCall;

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.getUserInfo();
    this.QueUeCalls();
    this.findPatients();
  }

  async QueUeCalls(): Promise<void> {
    const data: QueueCalls = await this.patientService.findAllQueUeCalls();
    this.queUeCalls = data.awaitingCall as QueueCall[];
    this.selectedQueueCall = this.queUeCalls[0];
  }

  async findPatients(): Promise<void> {
    const data: Patient = await this.patientService.findAllPatients();
    this.patients = data as unknown as Patient[];
  }

  onSelected(patient: QueueCall) {
    this.selectedQueueCall = patient;
  }

  async getUserInfo() {
    const item = await localStorage.getItem('auth');

    if (item) {
      const { fullName } = JSON.parse(item);
      this.userName = fullName;
    }
  }

  getPatientInfo(): Patient {
    if (this.selectedQueueCall) {
      return this.patients.filter(
        (patient: Patient) =>
          patient.fullName === this.selectedQueueCall.fullName
      )[0];
    }
    return {} as Patient;
  }
}
