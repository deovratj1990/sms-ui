import { Component, OnInit, Input } from '@angular/core';
import { AlertType } from '../../classes/enum/AlertType';
import { Alert } from '../../classes/render/Alert';

@Component({
  selector: 'app-alert-response',
  templateUrl: './alert-response.component.html',
  styleUrls: ['./alert-response.component.css']
})
export class AlertResponseComponent implements OnInit {

  @Input() private formAlert: Alert;
  private AlertType = AlertType;

  constructor() { }

  ngOnInit() {
  }

}
