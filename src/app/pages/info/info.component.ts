import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { LoginService } from 'src/app/services/login.service';
import { Patient, QueueCall } from 'src/app/services/patient.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  @Input() queueCall!: QueueCall;
  @Input() patient!: Patient;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {}

  logout() {
    this.loginService.logout();
  }

  addResponsible() {
    console.log(this.queueCall);
  }

  formatDate(date: string): string {
    if (date) {
      return moment(date).format('MM/DD/YYYY');
    }

    return '';
  }
}
