import { RecipeState } from './recipe.state';
import {
  ADD_RECIPE,
  DELETE_RECIPE,
  RecipeActions,
  SET_RECIPES,
  UPDATE_RECIPE
} from './recipe.actions';
import { Recipe } from '../recipe-list/recipe.model';
import { Ingredient } from '../../shared/ingredient.model';

const initialState: RecipeState = {
  recipes: [
    new Recipe(
      1,
      'Tasty Schinitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe(
      2,
      'Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [
        new Ingredient('Buns', 1),
        new Ingredient('Meat', 2)
      ])
  ]
};

export function recipeReducers(state = initialState, action: RecipeActions) {
  switch (action.type) {
    case SET_RECIPES: {
      return {
        ...state,
        recipes: [...action.payload]
      };
    }
    case ADD_RECIPE: {
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    }
    case UPDATE_RECIPE: {
      const updatingRecipe: Recipe = action.payload['updatingRecipe'];
      const recipes: Recipe[] = [...state.recipes];
      const index = recipes.findIndex((r: Recipe) => {
        return r.id === updatingRecipe.id;
      });
      updatingRecipe.id = recipes[index].id;
      recipes[index] = updatingRecipe;
      return {
        ...state,
        recipes: recipes
      };
    }
    case DELETE_RECIPE: {
      const deletingRecipe: Recipe = <Recipe>action.payload;
      const recipes: Recipe[] = [...state.recipes];
      const index = recipes.findIndex((r: Recipe) => {
        return r.id === deletingRecipe.id;
      });
      recipes.splice(index, 1);
      return {
        ...state,
        recipes: recipes
      };
    }
    default:
      return state;
  }
}
