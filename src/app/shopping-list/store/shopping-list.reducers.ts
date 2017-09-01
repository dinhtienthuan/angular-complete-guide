import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';
import { ShoppingListState } from './shopping-list.state';

const initialState: ShoppingListState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducers(state = initialState,
                                     action: ShoppingListActions.ShoppingListActions) {

  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    }

    case ShoppingListActions.ADD_INGREDIENTS: {
      const currentIngredients: Ingredient[] = state.ingredients;
      const addingIngredients: Ingredient[] = <Ingredient[]>action.payload;
      const newIngredients: Ingredient[] = [];

      // Deep copy current ingredients to new ingredients.
      for (const ingredient of currentIngredients) {
        const newIngredient: Ingredient = Object.assign({}, ingredient);
        newIngredients.push(newIngredient);
      }

      addingIngredients.forEach((addingIngredient: Ingredient) => {
        const existentIngredient: Ingredient = newIngredients.find((currentIngredient: Ingredient) => {
          return currentIngredient.name === addingIngredient.name;
        });
        if (existentIngredient) {
          existentIngredient.amount += addingIngredient.amount;
        } else {
          newIngredients.push(addingIngredient);
        }
      });

      return {
        ...state,
        ingredients: newIngredients
      };
    }
    case ShoppingListActions.UPDATE_INGREDIENT: {
      const ingredient: Ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredients = {
        ...ingredient,
        ...action.payload['newIngredient']
      };
      const ingredients = [...state.ingredients];
      ingredients[state.editedIngredientIndex] = <Ingredient>updatedIngredients;
      return {
        ...state,
        ingredients: ingredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    }
    case ShoppingListActions.DELETE_INGREDIENT: {
      const ingredients = [...state.ingredients];
      ingredients.splice(state.editedIngredientIndex, 1);
      return {
        ...state,
        ingredients: ingredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    }
    case ShoppingListActions.START_EDIT: {
      const editedIngredient = { ...state.ingredients[action.payload] };
      return {
        ...state,
        editedIngredient: editedIngredient,
        editedIngredientIndex: action.payload
      };
    }
    case ShoppingListActions.STOP_EDIT: {
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    }
    default:
      return state;
  }
}
