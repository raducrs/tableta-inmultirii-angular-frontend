import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  ViewChild, Input
} from '@angular/core';
import { MatAccordion, MatExpansionPanel } from '@angular/material/expansion';
import {Form, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {select, Store} from '@ngrx/store';
import {DonationState, Laptop, Phone, Tablet} from '../../state/donation.model';
import {selectGadgetType, selectLaptop, selectPhone, selectTablet} from '../../state/donation.selectors';
import {take} from 'rxjs/operators';
import {
  actionGadgetTypeUpdate,
  actionLaptopUpdate,
  actionPhoneUpdate,
  actionTabletUpdate
} from '../../state/donation.actions';

class TouchedFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.touched && (control.errors?.lenght > 0);
  }
}


@Component({
  selector: 'anms-gadget-tab',
  templateUrl: './gadget-tab.component.html',
  styleUrls: ['./gadget-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GadgetTabComponent implements OnInit {
  @Input('initialSelection') initialSelection;
  @Output() selectionMade: EventEmitter<boolean> = new EventEmitter<boolean>();

  selection;

  formLaptop: FormGroup;
  formTablet: FormGroup;
  formPhone: FormGroup;
  activeForm: FormGroup;

  @ViewChild('laptopPanel', { static: true }) laptopPanel: MatExpansionPanel;
  @ViewChild('tabletPanel', { static: true }) tabletPanel: MatExpansionPanel;
  @ViewChild('phonePanel', { static: true }) phonePanel: MatExpansionPanel;

  constructor(private store: Store<DonationState>) {}

  ngOnInit(): void {
    this.formLaptop = new FormGroup({
      lMake: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      lModel: new FormControl('', [Validators.maxLength(50)]),
      lYear: new FormControl('', [Validators.required]),
      lMemory: new FormControl('', []),
      lScreen: new FormControl('', []),
      lProcessor: new FormControl('', []),
      lFct: new FormControl('', [Validators.required]),
      lClean: new FormControl('', [Validators.required]),
      lAccess: new FormControl('', [Validators.required]),
    })
    this.formTablet = new FormGroup({
      tMake: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      tModel: new FormControl('', [Validators.maxLength(50)]),
      tYear: new FormControl('', [Validators.required]),
      tScreen: new FormControl('', []),
      tFct: new FormControl('', [Validators.required]),
      tClean: new FormControl('', [Validators.required]),
      tAccess: new FormControl('', [Validators.required]),
    })
    this.formPhone = new FormGroup({
      pMake: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      pModel: new FormControl('', [Validators.maxLength(50)]),
      pYear: new FormControl('', [Validators.required]),
      pScreen: new FormControl('', []),
      pFct: new FormControl('', [Validators.required]),
      pClean: new FormControl('', [Validators.required]),
      pAccess: new FormControl('', [Validators.required]),
    })
    this.activeForm = this.formLaptop;

    this.initForm();

    if (this.initialSelection) {
      this.selectedOption(this.initialSelection);
      this.laptopPanel.close();
      this.tabletPanel.close();
      this.phonePanel.close();
      switch (this.initialSelection){
        case 'laptop': this.laptopPanel.open(); break;
        case 'tablet': this.tabletPanel.open(); break;
        case 'phone': this.phonePanel.open(); break;
      }
    }
  }

  private initForm(){
    this.initLaptop();
    this.initTablet();
    this.initPhone();
    this.initSelection();
  }

  private initSelection(){
    this.store.pipe(select(selectGadgetType), take(1))
      .subscribe( gadgetType => {
        if (gadgetType) {
          this.selectedOption(gadgetType);
          this.laptopPanel.close();
          this.tabletPanel.close();
          this.phonePanel.close();
          switch (gadgetType){
            case 'laptop': this.laptopPanel.open(); break;
            case 'tablet': this.tabletPanel.open(); break;
            case 'phone': this.phonePanel.open(); break;
          }
        }
      })
  }

  private initLaptop(){
    this.store.pipe(select(selectLaptop), take(1))
      .subscribe( laptop => {
          this.setStringField(this.formLaptop, 'lModel', laptop, 'model');
          this.setStringField(this.formLaptop, 'lMake', laptop, 'make');
          this.setStringField(this.formLaptop, 'lYear', laptop, 'year');
          this.setStringField(this.formLaptop, 'lScreen', laptop, 'screen');
          this.setStringField(this.formLaptop, 'lMemory', laptop, 'memory');
          this.setStringField(this.formLaptop, 'lProcessor', laptop, 'processor');
          this.setStringField(this.formLaptop, 'lFct', laptop, 'functional');
          this.setStringField(this.formLaptop, 'lClean', laptop, 'clean');
          this.setStringField(this.formLaptop, 'lAccess', laptop, 'access');
      })
  }

  private initTablet(){
    this.store.pipe(select(selectTablet), take(1))
      .subscribe( tablet => {
        this.setStringField(this.formTablet, 'tModel', tablet, 'model');
        this.setStringField(this.formTablet, 'tMake', tablet, 'make');
        this.setStringField(this.formTablet, 'tYear', tablet, 'year');
        this.setStringField(this.formTablet, 'tScreen', tablet, 'screen');
        this.setStringField(this.formTablet, 'tFct', tablet, 'functional');
        this.setStringField(this.formTablet, 'tClean', tablet, 'clean');
        this.setStringField(this.formTablet, 'tAccess', tablet, 'access');
      })
  }

  private initPhone(){
    this.store.pipe(select(selectPhone), take(1))
      .subscribe( phone => {
        this.setStringField(this.formPhone, 'pModel', phone, 'model');
        this.setStringField(this.formPhone, 'pMake', phone, 'make');
        this.setStringField(this.formPhone, 'pYear', phone, 'year');
        this.setStringField(this.formPhone, 'pScreen', phone, 'screen');
        this.setStringField(this.formPhone, 'pFct', phone, 'functional');
        this.setStringField(this.formPhone, 'pClean', phone, 'clean');
        this.setStringField(this.formPhone, 'pAccess', phone, 'access');
      })
  }

  private setStringField(form: FormGroup, fcName: string, source: any, sField: string){
    if (source){
      form.controls[fcName].setValue(source[sField])
      form.controls[fcName].markAsUntouched();
    }
  }


  public hasError = (form: FormGroup , controlName: string, errorName: string) => {
    return form.controls[controlName].hasError(errorName);
  }
  public hasErrorCheckBox = (form: FormGroup , controlName: string, errorName: string) => {
    return (form.controls[controlName].touched || form.controls[controlName].dirty) && form.controls[controlName].hasError(errorName);
  }

  selectedOption(optionId) {
    this.store.dispatch(actionGadgetTypeUpdate({gadgetType: optionId}));
    this.selection = optionId;
    this.activeForm = this.formLaptop;
    if (this.selection === 'tablet'){
      this.activeForm = this.formTablet
    }
    if (this.selection === 'phone'){
      this.activeForm = this.formPhone
    }
    this.selectionMade.emit(this.activeForm.valid);
    this.activeForm.markAsUntouched({onlySelf: false});
    this.activeForm.statusChanges.subscribe(status => {
      this.selectionMade.emit(this.activeForm.valid);

      switch (this.activeForm){
        case this.formLaptop: this.store.dispatch(actionLaptopUpdate({laptop: this.getLaptop()})); break;
        case this.formTablet: this.store.dispatch(actionTabletUpdate({tablet: this.getTablet()})); break;
        case this.formPhone: this.store.dispatch(actionPhoneUpdate({phone: this.getPhone()})); break;
      }

    });




  }

  private getLaptop(): Laptop{
    return {
      model: this.formLaptop.controls['lModel'].value,
      make: this.formLaptop.controls['lMake'].value,
      year: this.formLaptop.controls['lYear'].value,
      screen: this.formLaptop.controls['lScreen'].value,
      memory: this.formLaptop.controls['lMemory'].value,
      processor: this.formLaptop.controls['lProcessor'].value,
      functional: this.formLaptop.controls['lFct'].valid,
      clean: this.formLaptop.controls['lClean'].valid,
      access: this.formLaptop.controls['lAccess'].valid,
    }
  }

  private getTablet(): Tablet{
    return {
      model: this.formTablet.controls['tModel'].value,
      make: this.formTablet.controls['tMake'].value,
      year: this.formTablet.controls['tYear'].value,
      screen: this.formTablet.controls['tScreen'].value,
      functional: this.formTablet.controls['tFct'].valid,
      clean: this.formTablet.controls['tClean'].valid,
      access: this.formTablet.controls['tAccess'].valid,
    }
  }

  private getPhone(): Phone {
    return {
      model: this.formPhone.controls['pModel'].value,
      make: this.formPhone.controls['pMake'].value,
      year: this.formPhone.controls['pYear'].value,
      screen: this.formPhone.controls['pScreen'].value,
      functional: this.formPhone.controls['pFct'].valid,
      clean: this.formPhone.controls['pClean'].valid,
      access: this.formPhone.controls['pAccess'].valid,
    }
  }

}
