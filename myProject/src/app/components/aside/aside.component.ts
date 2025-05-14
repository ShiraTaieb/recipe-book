import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from '../../app.component';
import { UsersService } from '../../services/users.service';
import { RecipesService } from '../../services/recipes.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css',
})
export class AsideComponent {
  name: String = '';
  dif: Number = 0;
  time: Number = 0;
  constructor(private s: RecipesService, private router: Router) {}
  save() {
    this.router.navigate(['all', this.name, this.dif, this.time]);
  }
}
