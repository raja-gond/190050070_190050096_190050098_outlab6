import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FeedbackService } from '../feedback.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
    someData: any;
    profileForm = new FormGroup({
      name: new FormControl('',Validators.required),
      email: new FormControl('',Validators.required),
      feedback: new FormControl('',Validators.required),
      comment: new FormControl(''),
    });
  constructor(private httpService: FeedbackService) { }
  ngOnInit(){
    this.httpService.getData('https://cs251-outlab-6.herokuapp.com/initial_values/').subscribe(
      data => {
        this.someData=data;
        this.profileForm.setValue({name: data.name , email: data.email, feedback: data.feedback, comment: data.comment,});
      }, error => {
        alert(error);
      }
    );
  }
  onSubmit(){
    this.httpService.postData(this.profileForm.value)
      .subscribe(
        data => {
          console.log("Success",data);
          alert("Success! Thanks for your valuable feedback.");
          this.profileForm.reset();
        },
        error =>{
          alert("Failed! Oops sorry, something went wrong.");
          if(this.someData) {this.profileForm.setValue({name: this.someData.name , email: this.someData.email, feedback: this.someData.feedback, comment: this.someData.comment,})};
          //console.error('error!',error);
        } ,      
      );
  }

}
