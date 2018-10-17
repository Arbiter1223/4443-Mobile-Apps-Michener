import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})

export class SignupPage
{
  signupError: string;
  form: FormGroup;

  constructor(
    fb: FormBuilder,
    private navCtrl: NavController,
    private auth: AuthService,
    public navParams: NavParams)
  {
    this.form = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  signup()
  {
    let data = this.form.value;
    let credentials =
    {
      email: data.email,
      password: data.password
    };
    this.auth.signup(credentials).then(
      () => this.navCtrl.setRoot(HomePage),
      error => this.signupError = error.message
    );
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad SignupPage');
  }

}
