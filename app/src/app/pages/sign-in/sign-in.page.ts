import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { EMAIL_PATTERN, LOGIN_SUCCESS_MSG, ERROR_MSG } from '../../config/config';
import { LoaderService } from '../../services/loader/loader.service';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  private loginForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder,
              private router: Router, 
              private readonly api: ApiService,
              private readonly loader: LoaderService,
              private readonly toast: ToastService) { }
  
  ngOnInit() {
    this.initForm();
  }
  
  /*
  * Form initialization
  */
  initForm() {
    this.loginForm = this.formBuilder.group({
      userName:    new FormControl('',  Validators.compose([ Validators.required,  Validators.pattern(EMAIL_PATTERN) ])),
      password: new FormControl('',  Validators.compose([ Validators.required , Validators.minLength(5)])),
    });
  }

  /*
  * Sign-In 
  */
  signIn() {
    if(this.loginForm.valid) {
      this.loader.presentLoading();
      this.api.doAuthenticate('login',this.loginForm.value).subscribe(response => {
        console.log('Response', response);
        if(response && response.token){
          this.toast.presentToast(LOGIN_SUCCESS_MSG);
          this.router.navigateByUrl('/home');
        }
        else
          this.toast.presentToast(ERROR_MSG);
      },
      error => {
        console.error(error)
        this.toast.presentToast(ERROR_MSG);
      },
      () => this.loader.dismissLoading());
    }
  }
}
