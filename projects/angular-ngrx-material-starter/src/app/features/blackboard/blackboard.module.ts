import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload/upload.component';
import {BlackboardRoutingModule} from './blackboard-routing.module';
import {SharedModule} from '../../shared/shared.module';
import { ShareComponent } from './share/share.component';



@NgModule({
  declarations: [UploadComponent, ShareComponent],
  imports: [
    CommonModule,
    SharedModule,
    BlackboardRoutingModule
  ]
})
export class BlackboardModule { }
