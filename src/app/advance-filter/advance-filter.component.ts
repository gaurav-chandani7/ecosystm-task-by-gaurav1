import { EventEmitter, Input } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-advance-filter',
  templateUrl: './advance-filter.component.html',
  styleUrls: ['./advance-filter.component.css']
})
export class AdvanceFilterComponent implements OnInit {
  @Input() cities:any[];
  @Input() isAdvanceFilterMode:boolean;
  filterAddHandler = new EventEmitter<object>();
  filterRemoveHandler = new EventEmitter<object>();
  selectedLocation: any;
  experienceFilter: number;

  constructor() { }

  ngOnInit(): void {
  }

  emitToParent(idx:number,type:string){
    if(idx==1){
      if(type==='location'){
        this.filterAddHandler.emit({'type':'location','data':this.selectedLocation.name});
        this.experienceFilter=undefined;
      }else if(type==='experience'){
        this.filterAddHandler.emit({'type':'experience','data':this.experienceFilter})
        this.selectedLocation = undefined;
      }
    }else if(idx==2){
      this.filterRemoveHandler.emit(this.selectedLocation);
      this.experienceFilter = undefined;
    }
  }

}
