import { Component, OnInit, Input } from '@angular/core';
import { Validation } from '../model/Validation';
import { AlertType } from '../../../class/enum/AlertType';
import { ValidationType } from '../../../class/enum/ValidationType';

@Component({
  selector: 'app-validation-error',
  templateUrl: './validation-error.component.html',
  styleUrls: ['./validation-error.component.css']
})
export class ValidationErrorComponent implements OnInit {

  @Input() private element: Validation;
  @Input() private model: any;
  @Input() private matchField: any;
  private matchFieldId: string = '';
  private AlertType = AlertType;
  private ValidationType = ValidationType;

  constructor() { }

  ngOnInit() { }

}
