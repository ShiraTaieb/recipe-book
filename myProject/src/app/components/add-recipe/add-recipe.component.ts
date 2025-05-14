import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from '../../app.component';
import { UsersService } from '../../services/users.service';
import { Recipe } from '../../classes/Recipe';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css',
})
export class AddRecipeComponent {
  r: Recipe = {
    name: '',
    difficultLevel: 0,
    img: '',
    ingrediets: [],
    time: 0,
  };

  submit() {
    if (this.us.getCur() != '') {
      this.rs.addRecipe(this.r);
      alert('המתכון נקלט בהצלחה!!');
      console.log(this.r);
    } else {
      alert('להוספת מוצר יש להתחבר למערכת');
    }
  }

  addIngredient() {
    this.r.ingrediets.push('');
  }
  constructor(private rs: RecipesService, private us: UsersService) {}
}
