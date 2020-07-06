import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BudgetItem} from '../shared/modules/budget-item.module';
import {MatDialog} from '@angular/material/dialog';
import {EditItemModalComponent} from '../edit-item-modal/edit-item-modal.component';

@Component({
  selector: 'app-budget-item-list',
  templateUrl: './budget-item-list.component.html',
  styleUrls: ['./budget-item-list.component.scss']
})

export class BudgetItemListComponent implements OnInit {


  @Input() budgetItems: BudgetItem[];
  @Output() delete: EventEmitter<BudgetItem> = new EventEmitter<BudgetItem>();
  @Output() update: EventEmitter<any> = new EventEmitter<any>();


  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onDelete(item : BudgetItem): void{
    this.delete.emit(item); // to send the item to the main page
  }

  onCardClicked(item: BudgetItem): void{
    // show the edit module
    const dialogRef = this.dialog.open(EditItemModalComponent, {
      width : '580px',
      data : item
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      // check if the result has a value
      if (result){ // result is the updated budget item

        this.update.emit({
          old : item,
          new : result
        });
      }

    });
  }
}


export interface updateEvent {
  old: BudgetItem;
  new: BudgetItem;
}
