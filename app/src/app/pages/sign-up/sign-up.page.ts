import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
import { Router } from '@angular/router';
import { EMAIL_PATTERN, LOGIN_SUCCESS_MSG, ERROR_MSG } from '../../config/config';
import { ToastService } from 'src/app/services/toast/toast.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { CustomValidator } from 'src/app/helpers/custom-validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  private signUpForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder,
              private router: Router, 
              private readonly api: ApiService,
              private toast: ToastService,
              private loader: LoaderService) { }
  
  ngOnInit() {
    this.initForm();
  }
  
  /*
  * Form initialization
  */
  initForm() {
    
    this.signUpForm = this.formBuilder.group({
      firstName : ['', Validators.required] ,
      lastName : ['', Validators.required] ,
      userName : ['', Validators.required] ,
      password : ['' , Validators.compose([ 
                  Validators.required,Validators.minLength(5)
                ]) ],
    confirmPassword: ['', Validators.compose([Validators.required])]
    } , { validators : CustomValidator.passwordValidator});

  }

  /*
  * Sign-Up 
  */
  signUp() {
    if(this.signUpForm.valid) {
      this.loader.presentLoading();
      this.api.doAuthenticate('signup',this.signUpForm.value).subscribe(response => {
        if(response && response.token){
          this.toast.presentToast(LOGIN_SUCCESS_MSG);
          this.router.navigateByUrl('/home');
        }
        else
          this.toast.presentToast(ERROR_MSG);
      },
      error => {
        console.error(error);
        this.toast.presentToast(ERROR_MSG);
      },
      () => this.loader.dismissLoading());
    }
  }

}