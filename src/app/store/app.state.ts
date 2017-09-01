import { ShoppingListState } from '../shopping-list/store/shopping-list.state';
import { AuthState } from '../auth/store/auth.state';
import { ActionReducerMap } from '@ngrx/store';
import { shoppingListReducers } from '../shopping-list/store/shopping-list.reducers';
import { authReducers } from '../auth/store/auth.reducers';

export interface AppState {
  shoppingList: ShoppingListState,
  auth: AuthState
}

export const reducers: ActionReducerMap<AppState> = {
  shoppingList: shoppingListReducers,
  auth: authReducers
}
