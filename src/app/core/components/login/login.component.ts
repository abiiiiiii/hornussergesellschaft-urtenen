import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../shared/models/user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value).then((res) => {
      this.authService.currentUser = {
        userId: res.user.uid
      };
    }).catch((err) => {
      console.log('login failed', err);
    })
  }

}
