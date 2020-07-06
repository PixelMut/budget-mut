import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {NgForm} from '@angular/forms';
import {BudgetItem} from '../shared/modules/budget-item.module';


@Component({
  selector: 'app-add-item-form',
  templateUrl: './add-item-form.component.html',
  styleUrls: ['./add-item-form.component.scss']
})
export class AddItemFormComponent implements OnInit {
  @Input() item: BudgetItem;
  @Output() formSubmit: EventEmitter<BudgetItem> = new EventEmitter<BudgetItem>();

  isNewItem: boolean;

  constructor() { }

  ngOnInit(): void {
    if(this.item){ // if item has a value
      // an existing item object was passed into the component
      // therefore this isn't a new item
      this.isNewItem = false;
    }else{
      this.isNewItem = true;
      this.item = new BudgetItem('', null);
    }
  }

  onSubmit(form : NgForm): void{
    this.formSubmit.emit(form.value);
    form.reset();
  }




}
