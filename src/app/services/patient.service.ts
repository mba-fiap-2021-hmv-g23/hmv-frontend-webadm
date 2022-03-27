import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface Patient {
  address: {
    zipcode: string;
    publicPlace: string;
    number: string;
    complement: string;
  };
  birthDate: string;
  cellphone: string;
  email: string;
  fullName: string;
  genre: string;
  healthCardNumber: string;
  healthInsurance: string;
  patientId: string;
  phone: string;
  taxId: string;
}

export interface QueueCall {
  age: string;
  checkInId: string;
  fullName: string;
  genre: string;
  lastCallDate: string;
  riskClassification: string;
}

export interface QueueCalls {
  awaitingCall: QueueCall[];
  inCall: QueueCall[];
  lastCalls: QueueCall[];
}

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private http: HttpClient) {}

  findAllQueUeCalls(): Promise<QueueCalls> {
    return this.http
      .get<QueueCalls>(`${environment.api}/attendances/queue-calls`)
      .toPromise();
  }

  findAllPatients(): Promise<Patient> {
    return this.http.get<Patient>(`${environment.api}/patients`).toPromise();
  }
}
