import { Component, OnInit, Input } from '@angular/core';
import { AlertType } from '../../classes/enum/AlertType';
import { ValidationType } from '../../classes/enum/ValidationType';
import { Validation } from '../../classes/io/Validation';

@Component({
  selector: 'app-form-element-status',
  templateUrl: './form-element-status.component.html',
  styleUrls: ['./form-element-status.component.css']
})
export class FormElementStatusComponent implements OnInit {

  @Input() private element: Validation;
  private AlertType = AlertType;
  private ValidationType = ValidationType;

  constructor() { }

  ngOnInit() { }
}
