import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  AfterViewInit,
  OnChanges,
  SimpleChanges, Output, EventEmitter
} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

export const gadgetIcons = {
  laptop: 'laptop',
  tablet: 'tablet',
  phone: 'mobile'
}

export const gadgetNames = {
  laptop: 'Laptop',
  tablet: 'Tableta',
  phone: 'Telefon'
}


export interface UserData{
  id: string,
  gadgetType: string,
  model: string
  year: string,
  diagonal: string,
  others: string,
  registeredUser: string,
  location: string
}

@Component({
  selector: 'anms-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class DisplayComponent implements OnInit, OnChanges, AfterViewInit {

  @Input('data') data: any;
  @Output('event') event = new EventEmitter<any>();

  columnsToDisplayName = {gadgetName: 'Tip', model: 'Model', year: 'An', diagonal: 'Diagonala', others: 'Altele', registeredUser: 'Utilizator inregistrat', location: 'Locatie', date: 'Adaugat'}
  columnsToDisplay = ['gadgetName', 'model', 'year', 'diagonal', 'others', 'location', 'date'] // registeredUser
  columnsToDisplayWD = [...this.columnsToDisplay, 'actionColumn'];
  expandedElement;

  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getIcon(gadgetType){
    return gadgetIcons[gadgetType];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.data){
      this.dataSource = new MatTableDataSource(changes.data.currentValue);
    }

  }

  onEvent(type, data){
    this.event.emit({type, data});
  }
}
