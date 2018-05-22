import { Component, OnInit, Input } from '@angular/core';
import { Alert } from '../../model/common/Alert';
import { AlertType } from '../../model/enum/AlertType';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertResponseComponent implements OnInit {

  @Input() private alert: Alert;
  private AlertType = AlertType;

  constructor() { }

  ngOnInit() {
  }

}
