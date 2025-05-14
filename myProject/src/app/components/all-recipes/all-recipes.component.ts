import { Component, inject, OnInit } from '@angular/core';
import { RecipesService } from '../../services/recipes.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Recipe } from '../../classes/Recipe';
import { UsersService } from '../../services/users.service';
import { NavComponent } from '../nav/nav.component';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-all-recipes',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './all-recipes.component.html',
  styleUrl: './all-recipes.component.css',
})
export class AllRecipesComponent implements OnInit {
  recipies = inject(RecipesService);
  arr: Recipe[] = []; // מערך המתכונים
  vals: { name: string; dif: Number; time: Number } = {
    //אובייקט לשמירת ערכי הניתוב
    name: '',
    dif: 0,
    time: 0,
  };

  constructor(
    private router: Router,
    private ar: ActivatedRoute,
    private us: UsersService,
    private ur: RecipesService
  ) {}

  ngOnInit() {
    this.getAllRecipies();
    this.listenToUrlChanges();
  }

  // פונקציה לשליפת המתכונים
  getAllRecipies() {
    this.recipies.getAll().subscribe(
      (r) => {
        console.log('hello!!');
        this.arr = [...r]; // עדכון המערך עם המתכונים שהתקבלו
        this.filterRecipes();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // פונקציה לסינון המתכונים לפי הקריטריונים
  filterRecipes() {
    console.log('before', this.arr);
    this.arr = this.arr.filter(
      (r) =>
        (this.vals.name === '' ||
          r.name.toLowerCase().includes(this.vals.name.toLowerCase())) && //בדיקה עם זה כולל את המילה ..שלא יצטרכו לכתוב בדיוק מה שכתוב סינון יותר קל למשתמש..
        (this.vals.dif === 0 || r.difficultLevel <= this.vals.dif) && // קושי מסונן עד מה שהכניס המשתמש פחות או שווה..
        (this.vals.time === 0 || r.time <= this.vals.time)
    );
    console.log('after', this.arr);
  }

  // הקשבה לשינויים ב-URL כדי לעדכן את ה-vals
  listenToUrlChanges() {
    this.ar.paramMap.subscribe((params) => {
      const newName = params.get('name') || ''; // אם לא קיים, תן ערך ברירת מחדל
      const newDif = Number(params.get('dif')) || 0; // המרה ל-number עם ערך ברירת מחדל
      const newTime = Number(params.get('time')) || 0; // המרה ל-number עם ערך ברירת מחדל

      // אם הערכים השתנו, עדכן את ה-vals
      if (
        newName !== this.vals.name ||
        newDif !== this.vals.dif ||
        newTime !== this.vals.time
      ) {
        this.vals.name = newName;
        this.vals.dif = newDif;
        this.vals.time = newTime;

        // עדכון נוסף של המערך
        //מכיוון שלאחר הסינון הוא שומר את ערכי הסינון ואז סינון בפעם נוספת לא נמצא..
        this.getAllRecipies();

        // לאחר קבלת המתכונים, מבוצע סינון מחדש
        this.filterRecipes();
      }
    });
  }

  //פרטים נוספים
  showMore(_id: string) {
    console.log(_id);
    this.router.navigate(['/recipe', _id]);
  }
}
