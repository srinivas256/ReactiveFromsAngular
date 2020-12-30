import { Component, OnInit } from '@angular/core';
import { User} from './model';
import { DataServiceService} from './data-service.service';
import {FormGroup, FormControl, FormBuilder, Validators, FormArray} from '@angular/forms';
import {forbiddenNameValidator} from './shared/user-name.validator';
import { PasswordValidator} from './shared/password.validator';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
   
  constructor( private _dataService:DataServiceService,
    private _fb:FormBuilder ){}
  
 /* registration = new FormGroup({
    username: new FormControl("srinivas"),
    password: new FormControl("srinivas123"),
    cnfrmPassowrd: new FormControl("srinivas123"),
    address: new FormGroup({
      state: new FormControl(""),
      country: new FormControl("")
    })
  });*/
  registration:FormGroup;
  get username(){
    return this.registration.get('username');
  }

  get email(){
    return this.registration.get("email");
  }

  get alternateEmails(){
    return this.registration.get('alternateEmails') as FormArray;
  }

  addAlternateEmail(){
    this.alternateEmails.push(this._fb.control(''));
  }
  ngOnInit(){
    /* FormBuilder is an alaternate method to create form*/
   this.registration = this._fb.group({
      username:['',[Validators.required, Validators.minLength(3), forbiddenNameValidator]],
      email:[''],
      subscribe:[false],
      password:[''],
      cnfrmPassowrd:[''],
      address: this._fb.group({
        state:[''],
        country:['']
      }),
      alternateEmails: this._fb.array([])
    }, {validator:PasswordValidator});

    this.registration.get("subscribe").valueChanges
    .subscribe( checkedValue => {
      const email = this.registration.get("email");
      if (checkedValue){
        email.setValidators(Validators.required);
      }
      else{
        email.clearValidators();
      }
      email.updateValueAndValidity();
    })
 
  }
  
   
  /* update form fields progaramatically using setValue, patchValue
     for all forms fields use setValue & for partially update use patchValue */
     loadData(){
     /* this.registration.setValue({
      username:"venky",
      password:"",
      cnfrmPassowrd:"",
      address:{
        state: 'telangana',
        country:'india'
      }
    });*/
    this.registration.patchValue({
      username:'venky',
      address:{
      country:'india'
      }
    })
}

onSubmit(){
  console.log(this.registration.value);
  /*  this._registrationService.register(this.registration.value)
      .subscribe(response => console.log('Success', response),
        error => console.log("error", error)
      );

     // In service
     register(userData){
       return this._http.post<any>(this.url, userData);
     }
  */
}

}
