import {ActivationEnd, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Actions, createEffect} from '@ngrx/effects';
import {filter, tap} from 'rxjs/operators';
import {MetaServiceService} from './meta-service.service';



@Injectable()
export class MetaTagsEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private metaService: MetaServiceService,
  ) {}


   setTitle = createEffect(
    () =>
        this.router.events.pipe(
          filter((event) => event instanceof ActivationEnd)
        ).pipe(
        tap(() => {
          this.metaService.setMeta(
            this.router.routerState.snapshot.root,
          );
        })
      ),
    { dispatch: false }
  );
}
