import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QueueCall } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
})
export class PatientComponent implements OnInit {
  @Input() queueCall!: QueueCall;
  @Input() selectedId!: string;
  @Output() onSelected: EventEmitter<QueueCall> = new EventEmitter<QueueCall>();

  constructor() {}

  ngOnInit(): void {}

  onClick() {
    this.onSelected.emit(this.queueCall);
  }
}
