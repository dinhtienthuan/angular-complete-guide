import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FeatureState } from '../store/feature.state';
import { Observable } from 'rxjs/Observable';
import { RecipeState } from '../store/recipe.state';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipeState: Observable<RecipeState>;

  constructor(
    private router: Router,
    private store: Store<FeatureState>) {
  }

  ngOnInit() {
    this.recipeState = this.store.select(state => state.recipes);
  }

  onNewRecipe() {
    this.router.navigate(['/recipes', 'new']);
  }
}
