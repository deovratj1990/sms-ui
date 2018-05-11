import { Component, OnInit, Input } from '@angular/core';
import { AlertType } from '../../classes/enum/AlertType';
import { ValidationType } from '../../classes/enum/ValidationType';
import { Validation } from '../../classes/io/Validation';

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
