import { Recipe } from './recipe-list/recipe.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import {
  HttpClient,
  HttpRequest
} from '@angular/common/http';

@Injectable()
export class RecipeService {
  recipeChanged = new Subject();

  private recipes: Recipe[] = [
    // new Recipe(
    //   1,
    //   'Tasty Schinitzel',
    //   'A super-tasty Schnitzel - just awesome!',
    //   'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
    //   [
    //     new Ingredient('Meat', 1),
    //     new Ingredient('French Fries', 20)
    //   ]),
    // new Recipe(
    //   2,
    //   'Big Fat Burger',
    //   'What else you need to say?',
    //   'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
    //   [
    //     new Ingredient('Buns', 1),
    //     new Ingredient('Meat', 2)
    //   ])
  ];

  constructor(private httpClient: HttpClient) {
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes.slice().find((recipe: Recipe) => {
      return recipe.id === id;
    });
  }

  addRecipe(recipe: Recipe) {
    recipe.id = Date.now();
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(id: number, recipe: Recipe) {
    recipe.id = id;
    const index = this.recipes.findIndex((r: Recipe) => {
      return r.id === recipe.id;
    });
    this.recipes[index] = recipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(recipe: Recipe) {
    const index = this.recipes.findIndex((r: Recipe) => {
      return r.id === recipe.id;
    });
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
    // this.shoppingListService.refreshIngredientQuantity(recipe.ingredients);
  }

  saveRecipes() {
    const request = new HttpRequest('PUT', 'https://recipe-book-351fa.firebaseio.com/recipe.json', this.recipes, {
      reportProgress: true
    });

    return this.httpClient.request(request);
  }

  // createHttpParams(params: {[key: string]: string}): HttpParams {
  //   let httpParams = new HttpParams();
  //   for (const key of Object.keys(params)) {
  //     httpParams = httpParams.set(key, params[key]);
  //   }
  //   return httpParams;
  // }

  fetchRecipes() {
    this.httpClient.get<Recipe[]>('https://recipe-book-351fa.firebaseio.com/recipe.json?', {
      'observe': 'body',
      'responseType': 'json'
    })
      .map((recipes) => {
        for (const recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      }).catch(() => {
      return Observable.throw('Something went wrong when fetching recipes');
    }).subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
      this.recipeChanged.next(this.recipes.slice());
    });
  }

}
