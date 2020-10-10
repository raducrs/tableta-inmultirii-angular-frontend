import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {FeedbackDialogComponent} from '../feedback-dialog/feedback-dialog.component';

@Component({
  selector: 'anms-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class FeedbackComponent implements OnInit {

  hidden = false;
  visible = true;
  count = 0;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  public showFeedbackForm(){
    const ref = this.dialog.open(FeedbackDialogComponent);
    ref.afterClosed().subscribe(
      data => {
        if (data && data.send) {
          this.count += 1;
          if (this.count >= 2) {
            this.visible = false;
          }
        }
      }
    );
  }

}
