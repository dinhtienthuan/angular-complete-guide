import { Component, OnInit } from '@angular/core';

import { RecipeService } from '../../recipes/recipe.service';
import { HttpEvent } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AuthState } from '../../auth/store/auth.state';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../../store/app.state';
import { Signout } from '../../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authState: Observable<AuthState>;

  constructor(private recipeService: RecipeService,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.authState = this.store.select<AuthState>(state => state.auth);
  }

  onSaveData() {
    this.recipeService.saveRecipes().subscribe((response: HttpEvent<Object>) => {
      console.log(response);
    });
  }

  onFetchData() {
    this.recipeService.fetchRecipes();
  }

  logout() {
    this.store.dispatch(new Signout());
  }
}
