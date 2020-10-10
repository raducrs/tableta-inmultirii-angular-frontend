import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { MatAccordion, MatExpansionPanel } from '@angular/material/expansion';
import {HttpClient} from '@angular/common/http';
import {DonationState} from '../../state/donation.model';
import {select, Store} from '@ngrx/store';
import {selectLocation} from '../../state/donation.selectors';
import {actionLocationDelete, actionLocationUpdate} from '../../state/donation.actions';


export const icons = ['city', 'hand-holding-heart', 'graduation-cap'];
export const colors = ['grey', 'white', 'lightblue'];

@Component({
  selector: 'anms-location-tab',
  templateUrl: './location-tab.component.html',
  styleUrls: ['./location-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationTabComponent implements OnInit {
  @Output() selectionMade: EventEmitter<boolean> = new EventEmitter<boolean>();




  searchTerm = '';
  selection;
  filteredElements: any[] = [];


  allElements: any[];

  constructor(private httpClient: HttpClient, private store: Store<DonationState>) {}

  ngOnInit(): void {
    this.httpClient.get<any[]>('assets/locations.json')
      .subscribe(locations => {
        this.allElements = locations;
        this.store.pipe(select(selectLocation))
          .subscribe( location => {
            if (location && location.locationId){
              const foundLoc = this.allElements.filter(elem => elem.locId === location.locationId);
              if (foundLoc && foundLoc.length === 1){
                this.selection = foundLoc[0];
                this.selectionMade.emit(true);
              }
            }
          })
      })
    this.filteredElements = [];


  }

  changeFilter(searchTerm) {
    if (searchTerm === '') {
      this.clearFilter();
      return;
    }


    this.searchTerm = searchTerm;

    // @TODO server side logic
    if (searchTerm && searchTerm.length > 2) {
      this.filteredElements = this.filterOfSearchTerm();
    }

  }

  filterOfSearchTerm() {
    const searchTerms = this.searchTerm.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(/[\s,]+/)
    let filteredElements = this.allElements;
    searchTerms.filter(elem => elem.length > 0).forEach(term => {
      filteredElements = filteredElements.filter(elem => elem.search.indexOf(term) >= 0)
    })
    return filteredElements;
    // return this.allElements
    //   .filter(elem => this.filterElemBySearchTerm(elem, this.searchTerm))

  }

  private filterElemBySearchTerm(elem, searchTerm: any) {
    return elem.search.indexOf(searchTerm) >= 0;
  }





  clearFilter() {
    // @TODO add clear button in search bar
    this.searchTerm = '';
    this.filteredElements = [];
  }

  selectedOption(selection) {
    this.selection = selection;
    this.selectionMade.emit(true);
    this.store.dispatch(actionLocationUpdate({
      location: {
        name: this.selection.description,
        locationId: this.selection.locId,
        address: this.selection.address ? this.selection.address : 'Oriunde',
        category: this.selection.categoryId
      }
    }))
  }



  onUnselect(element) {
    this.selection = undefined;
    this.changeFilter(this.searchTerm);
    this.selectionMade.emit(false);
    this.store.dispatch(actionLocationDelete())
  }

  onSelect(element) {
    this.filteredElements = [];
    this.selectedOption(element)
  }

  getIcon(element){
    return icons[element.categoryId];
  }

  getColor(element){
    return colors[element.categoryId];
  }
}
