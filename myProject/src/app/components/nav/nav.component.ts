import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { MatIconModule } from '@angular/material/icon';
import { AsideComponent } from '../aside/aside.component';
import { User } from '../../classes/User';
import mongoose from 'mongoose';
import { Recipe } from '../../classes/Recipe';

@Component({
  selector: 'app-nav',
  imports: [RouterOutlet, RouterLink, MatIconModule, AsideComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  constructor(private us: UsersService) {}
  cur?: string;
  private arr: User[] = [];

  ngOnInit() {
   // this.cur = 'guest'; // אם אין ערך, הצג guest
    this.us.getAll().subscribe((a) => {
      this.arr = a;
    });
  }
  getCur() {
    this.cur = this.us.getCur();
    if (this.cur != undefined) {
      return this.arr.find((u) => u._id == this.cur)?.username;
    } else {
      return 'guest';
    }
  }
  logout() {
    this.us.logout();
  }
}
