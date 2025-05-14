import { Injectable } from '@angular/core';
import { User } from '../classes/User';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import mongoose from 'mongoose';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  //   private users: User[] = [
  //     {
  //       id: 0,
  //       userName: 'Tsofnat Maman',
  //       password: '1234',
  //     },
  //     {
  //       id: 1,
  //       userName: 'Shira Taieb',
  //       password: '1111',
  //     },
  //     {
  //       id: 2,
  //       userName: 'Reut Ovadya {chalimi}',
  //       password: '2222',
  //     },
  //   ];
  //   getUsers() {
  //     return this.users;
  //   }

  //   addUser(user: User) {
  //     user.id = this.id;
  //     this.id++;
  //     this.users.push(user);
  //     this.setCur(user.userName, user.password);
  //   }

  private curUser?: string = '';
  private arr: User[] = [];

  private url: string = 'http://localhost:3001/users/';

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.url + 'register', user);
  }

  getCur() {
    return this.curUser;
  }

  private temp: User = {
    _id: '',
    username: '',
    password: '',
  };

  // login(userName: String, password: String) {
  //   this.getAll().subscribe((r) => {
  //     this.temp = r.find(
  //       (u) =>
  //         u.username &&
  //         u.username == userName &&
  //         u.password &&
  //         u.password == password
  //     )!;
  //     console.log(this.temp);
  //     if (this.temp) {
  //       this.setCur(userName, password);
  //       console.log('set to: ', this.curUser);
  //       alert(`ברוך שובך ${userName}`);
  //     } else {
  //       this.router.navigate(['signup']);
  //     }
  //   });
  // }
  login(userName: String, password: String) {
    return this.http
      .post<User>(this.url + 'login', {
        username: userName,
        password: password,
      })
      .subscribe({
        next: (u) => {
          this.setCur(u._id!);
          alert(`ברוך שובך ${u.username}`);
          if (u == undefined) {
            this.router.navigate(['signup']);
          }
        },
        error: (err) => {
          console.log('Error:', err);
        },
      });
  }
  setCur(id: string) {
    this.curUser = id;
    this.router.navigate(['all']);
  }
  logout() {
    this.curUser = '';
  }

  constructor(private router: Router, private http: HttpClient) {}
}
