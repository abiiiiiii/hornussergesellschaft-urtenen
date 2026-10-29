import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { NewsService } from "../../../shared/services/news.service";
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatFormField, MatLabel, MatInput } from '@angular/material/input';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatProgressSpinner, ReactiveFormsModule, MatFormField, MatLabel, MatInput]
})
export class LoginComponent implements OnInit {

  private readonly authService = inject(AuthService);
  private readonly formBuilder = inject(UntypedFormBuilder);
  private readonly router = inject(Router);
  private readonly newsService = inject(NewsService);

  loginError = false;
  isLoggingIn = false;
  loginForm: UntypedFormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor() {
    this.loginForm.valueChanges.subscribe(() => this.loginError = false);
  }

  ngOnInit(): void {
  }

  login() {
    this.isLoggingIn = true;
    this.authService.login(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value).subscribe({
      next: () => {
        this.isLoggingIn = false;
        this.router.navigate(['home']);
      },
      error: () => {
        this.isLoggingIn = false;
        this.loginError = true;
      }
    });
  }

}
