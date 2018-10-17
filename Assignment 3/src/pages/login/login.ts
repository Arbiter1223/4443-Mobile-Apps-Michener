import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthService } from '../../services/auth.service';
import { SignupPage } from '../signup/signup';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage
{
  loginForm: FormGroup;
  loginError: string;

  constructor(
    private navCtrl: NavController,
    private auth: AuthService,
    public navParams: NavParams,
    fb: FormBuilder)
  {
    this.loginForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  // Checks the user's credentials, and logs in if they are valid
  login()
  {
    let data = this.loginForm.value;

    // Return if credentials are invalid
    if (!data.email)
      return;

    // Otherwise, proceed with signing in with the entered credentials
    let credentials = 
    {
      email: data.email,
      password: data.password
    };

    this.auth.signInWithEmail(credentials).then(
      () => this.navCtrl.setRoot(HomePage),
      error => this.loginError = error.message
    );
  }

  // If user clicks signup, go to signup page
  signup()
  {
    this.navCtrl.push(SignupPage);
  }

  // BUG
  // If user wishes to sign in with Google, attempt to sign in with Google credentials
  
  /*

  loginWithGoogle()
  {
    this.auth.signInWithGoogle().then(
        () => this.navCtrl.setRoot(HomePage),
        error => console.log(error.message)
      );
  }

  */

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad LoginPage');
  }

}
