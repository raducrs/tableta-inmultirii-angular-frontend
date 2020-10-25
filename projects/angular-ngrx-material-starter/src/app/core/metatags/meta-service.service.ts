import {Injectable} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {ActivatedRouteSnapshot} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {filter} from 'rxjs/operators';
import {environment as env} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MetaServiceService {

  private defTitle = 'Tableta Înmulțirii';

  constructor(
    private title: Title,
    private metaService: Meta
  ) {}

  setMeta(
    snapshot: ActivatedRouteSnapshot
  ) {
    let lastChild = snapshot;
    while (lastChild.children.length) {
      lastChild = lastChild.children[0];
    }
    const  title  = (lastChild.data && lastChild.data.title) ? lastChild.data.title : this.defTitle ;
    this.title.setTitle(title);
    this.metaService.updateTag({
      name: 'og:title',
      description: title
    })

    if (lastChild.data && lastChild.data.description){
      this.metaService.updateTag({
        name: 'og:description',
        description: lastChild.data.description
      })
    }
  }
}
