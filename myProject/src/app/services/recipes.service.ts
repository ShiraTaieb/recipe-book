import { Injectable } from '@angular/core';
import { Recipe } from '../classes/Recipe';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private url: string = `http://localhost:3001/recipies/`;
  arr: Recipe[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  getAll(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.url);
  }

  addRecipe(r: Recipe) {
    this.http.post<Recipe>(this.url, r).subscribe((res) => {
      console.log(res);
      this.router.navigate(['all']);
    });
  }
  getById(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`http://localhost:3001/recipies/${id}`);
  }
  delRecipe(id: string) {
    console.log('dellll');
    console.log(id);
    return this.http
      .delete<Recipe>(`http://localhost:3001/recipies/${id}`)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['all']);
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
  upDateRecipe(){

  }
}
