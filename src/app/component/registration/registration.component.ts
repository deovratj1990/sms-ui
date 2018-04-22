import { Component, OnInit } from '@angular/core';

import { Society } from '../../classes/render/Society';
import { SocietyService } from '../../service/society.service';
import { Room } from '../../classes/render/Room';
import { RoomService } from '../../service/room.service';

import { RegistrationForm } from '../../classes/io/RegistrationForm';
import { RegistrationService } from '../../service/registration.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  societies: Array<Society> = new Array<Society>();

  rooms: Array<Room> = new Array<Room>();

  registration: RegistrationForm = new RegistrationForm();

  private formRegistrationMsg: string = '';
  private formRegistrationSuccess: boolean = true;

  private validation: any = { mobile: false, confirmPassword: false };

  constructor(
    private societyService: SocietyService,
    private roomService: RoomService,
    private registrationService: RegistrationService,
  ) { }

  ngOnInit() { 
    this.getSociety();
  }

  //society/getAll
  getSociety(): void {
    this.societyService.getSocieties()
    .subscribe(
      response => {
        this.societies = response;
      }
    );
  }

  getRooms($event) {
    let societyId = $event.srcElement.value;

    this.roomService.getRoomsBySocietyId(societyId)
    .subscribe(
      response => {
        this.rooms = response;
      }
    );
  }

  validateMobile($event) {
    this.validation.mobile = false;
    let mobile = $event.srcElement.value;
    if((mobile as string).length === 10) {
      this.validation.mobile = true;
    }
  }

  validatePassword(compareString, $event) {
    let withString = $event.srcElement.value;
    this.validation.confirmPassword = false;

    if(compareString.value == withString) {
      this.validation.confirmPassword = true;
    }
  }

  register(formRegistration) {
    this.registration = formRegistration.value;

    //member/registration
    this.registrationService.registration(JSON.stringify(this.registration))
    .subscribe(
      response => {
          this.formRegistrationMsg = response.message;
          this.formRegistrationSuccess = true;
          formRegistration.reset();
      },
      (error: Response) => {
        if(error.status == 400) {
          this.formRegistrationMsg = error.json()['message'];
          this.formRegistrationSuccess = false;
          return false;
        }

        this.formRegistrationMsg = 'Unexpected Error Occured';
        formRegistration.reset();
      }
    );
  }
}