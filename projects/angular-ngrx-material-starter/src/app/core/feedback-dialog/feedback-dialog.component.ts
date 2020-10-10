import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'anms-feedback-dialog',
  templateUrl: './feedback-dialog.component.html',
  styleUrls: ['./feedback-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedbackDialogComponent implements OnInit {

  apiGateway = environment.apiGateway;

  frmGr;
  sending = false;

  constructor(private httpClient: HttpClient, private dialogRef: MatDialogRef<FeedbackDialogComponent>) {
    this.frmGr = new FormGroup({
      comment: new FormControl('', [Validators.required, Validators.maxLength(1500)])
    })
  }

  ngOnInit(): void {
  }

  public sendComment(){
    this.sending = true;
    if (this.frmGr.valid){
      this.httpClient.post(`${this.apiGateway}/feedback`, { eventType: 'feedback', content: this.frmGr.controls.comment.value})
        .subscribe(res => {
          this.sending = false;
          this.dialogRef.close({send: true});
        }, error => { this.sending = false; })
    }
  }

}
