import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../../classes/Recipe';
import { RecipesService } from '../../services/recipes.service';
import { MatIconModule } from '@angular/material/icon';
import mongoose from 'mongoose';
import { log } from 'console';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe',
  imports: [CommonModule, MatIconModule],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css',
})
export class RecipeComponent {
  _id: string = '';

  r: Recipe = {
    _id: '',
    name: '',
    difficultLevel: 0,
    time: 0,
    ingrediets: [],
    img: '',
  };

  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((p) => {
      this._id = p['id'];
      console.log('עובד!!!!');
    });
    this.recipesService.getById(this._id).subscribe({
      next: (rs) => {
        console.log('Recipe data:', rs);
        console.log('ingredients:', rs.ingrediets); // הדפסת הנתונים שהתקבלו

        this.r = rs;
      },
      error: (err) => {
        console.error('Error fetching recipe:', err); // הדפסת שגיאה אם יש בעיה בבקשה
        console.log('shhhhhhhhhhhhhhhhhhhhhh');
      },
    });
  }
  del() {
    this.recipesService.delRecipe(this.r._id!);
  }
  update() {
    this.recipesService.upDateRecipe();
  }
}
