import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { ShoppingListState } from '../store/shopping-list.state';
import {
  AddIngredient,
  DeleteIngredient,
  StopEdit,
  UpdateIngredient
} from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppingListForm: NgForm;
  editIngredientSubscription: Subscription;
  editMode = false;
  editIngredient: Ingredient;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.editIngredientSubscription = this.store.select<ShoppingListState>(
      state => state.shoppingList).subscribe((shoppingListState: ShoppingListState) => {
      if (shoppingListState.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editIngredient = shoppingListState.editedIngredient;
        this.shoppingListForm.setValue({
          'name': this.editIngredient.name,
          'amount': this.editIngredient.amount
        });
      } else {
        this.editMode = false;
      }
    });
  }

  onSubmit(form: NgForm) {
    const data = form.value;
    const newIngredient = new Ingredient(data.name, data.amount);
    if (this.editMode) {
      this.store.dispatch(new UpdateIngredient({
        newIngredient: newIngredient
      }));
    } else {
      this.store.dispatch(new AddIngredient(newIngredient));
    }
    this.resetForm();
  }

  ngOnDestroy() {
    this.store.dispatch(new StopEdit());
    this.editIngredientSubscription.unsubscribe();
  }

  resetForm() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onClear() {
    this.resetForm();
  }

  onDelete() {
    this.store.dispatch(new DeleteIngredient());
    this.resetForm();
  }
}
