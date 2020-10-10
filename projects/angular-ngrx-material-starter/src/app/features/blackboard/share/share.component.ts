import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Meta} from '@angular/platform-browser';

@Component({
  selector: 'anms-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShareComponent implements OnInit {

  imgSrc = '';

  constructor(private route: ActivatedRoute, private metaService: Meta) { }

  ngOnInit(): void {
    const imgId = this.route.snapshot.paramMap.get('image');
    this.imgSrc = `https://tableta-inmultirii-public.s3.eu-central-1.amazonaws.com/${imgId}.jpg`
    this.metaService.updateTag({
      name: 'og:description',
      description: 'Crează propria tablă desenată. Donează pe Tableta Înmulțirii pentru Educație digitală cu șanse egale!'
    })
    this.metaService.updateTag({
      name: 'og:title',
      description: 'Tableta Înmulțirii - Educație digitală cu șanse egale'
    })
    this.metaService.updateTag({
      name: 'og:image',
      description: `https://tableta-inmultirii-public.s3.eu-central-1.amazonaws.com/${imgId}.jpg`
    })
  }

}
