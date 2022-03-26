import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../shared/models/user.model";
import {Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/storage";
import {AngularFirestore} from "@angular/fire/firestore";
import {News} from "../../../shared/models/news.model";
import {NewsService} from "../../../shared/services/news.service";

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

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private newsService: NewsService) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value).subscribe((res) => {
      this.authService.getUserRole(res.user.uid).subscribe(role => {
        if (role.exists) {
          this.authService.currentUser = {
            userId: res.user.uid,
            role: role.data().role
          }
        }
      });
      this.router.navigate(['home']);
    });
  }

}
