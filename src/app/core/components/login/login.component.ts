import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NewsService } from "../../../shared/services/news.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginError = false;
  isLoggingIn = false;
  loginForm: UntypedFormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private authService: AuthService, private formBuilder: UntypedFormBuilder, private router: Router, private newsService: NewsService) {
    this.loginForm.valueChanges.subscribe(() => this.loginError = false)
  }

  ngOnInit(): void {
  }

  login() {
    this.isLoggingIn = true;
    this.authService.login(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value).subscribe((res) => {
      this.authService.getUserRole(res.user.uid).subscribe(role => {
        if (role.exists) {
          this.authService.currentUser = {
            userId: res.user.uid,
            role: role.data().role
          }
        }
      });
      this.isLoggingIn = false;
      this.router.navigate(['home']);
    }, error => {
      this.isLoggingIn = false;
      this.loginError = true;
    });
  }

}
