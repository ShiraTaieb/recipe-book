import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from '../../app.component';
import { UsersService } from '../../services/users.service';
import mongoose from 'mongoose';
import { User } from '../../classes/User';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  username: string = '';
  password: string = '';
  password_verify: string = '';

  constructor(private userService: UsersService) {}

  private user: User = { username: '', password: '' };

  submit() {
    this.user.password = this.password;
    this.user.username = this.username;

    console.log('in submit', this.user);
    alert('ברכותינו על הרשמתך!!');
    this.userService.addUser(this.user).subscribe(
      (res) => {
        console.log('res:', res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  get isPasswordMismatch(): boolean {
    return (
      this.password != '' &&
      this.password_verify != '' &&
      this.password !== this.password_verify
    );
  }
}
