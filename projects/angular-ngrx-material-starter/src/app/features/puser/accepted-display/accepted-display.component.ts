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
import {MatTable, MatTableDataSource} from '@angular/material/table';
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

export const statusIcons = {
  accepted: 'trash',
  contactshown: 'trash',
  contacted: 'trash',
  given: 'trash',
}

export const statusTranslation = {
  accepted: 'Netratata',
  contactshown: 'Necontactat',
  contacted: 'Contactat',
  given: 'Primit',
}

export const statusColor = {
  accepted: 'lightgrey',
  contactshown: 'grey',
  contacted: 'orange',
  given: 'green',
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
  selector: 'anms-accepted-display',
  templateUrl: './accepted-display.component.html',
  styleUrls: ['./accepted-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class AcceptedDisplayComponent implements OnInit, OnChanges, AfterViewInit {

  @Input('data') data: any;
  @Output('event') event = new EventEmitter<any>();

  columnsToDisplayName = {gadgetName: 'Tip', model: 'Model', year: 'An', diagonal: 'Diagonala', others: 'Altele', registeredUser: 'Utilizator inregistrat', location: 'Locatie', date: 'Adaugat' , status: 'Statut'}
  columnsToDisplay = ['gadgetName', 'model', 'year', 'diagonal', 'others', 'location', 'date'] // , 'registeredUser'
  columnsToDisplayWD = [...this.columnsToDisplay, 'status', 'actionColumn'];
  expandedElement;

  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;


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
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

  }

  onEvent(type, data, element){
    this.event.emit({type, data, element});
  }

  getStatus(status: string){
    return statusTranslation[this.correctStatus(status)];
  }

  getStatusIcon(status: string){
    return statusIcons[this.correctStatus(status)];
  }

  getColor(status: string){
    return statusColor[this.correctStatus(status)];
  }

  private correctStatus(status: string){
    return status ? status.replace('-', '' ) : 'accepted';
  }
}
