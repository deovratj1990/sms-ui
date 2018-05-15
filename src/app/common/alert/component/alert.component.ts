import { Component, OnInit, Input } from '@angular/core';
import { Alert } from '../../../class/common/Alert';
import { AlertType } from '../../../class/enum/AlertType';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input() private alert: Alert;
  private AlertType = AlertType;

  constructor() { }

  ngOnInit() {
  }

}
