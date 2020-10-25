import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {NotificationService} from '../../../core/notifications/notification.service';

@Component({
  selector: 'anms-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadComponent implements OnInit {

  apiGateway = environment.apiGateway;

  loading = new BehaviorSubject( false);
  noResult = new BehaviorSubject(true);
  failedProcessing = new BehaviorSubject(false);
  uploadError = new BehaviorSubject('');
  imgSrc = '';
  key = '';
  sharing = new BehaviorSubject<{type: string, error?: any}>({type: 'initial'}  );
  private count: number;
  private timer: NodeJS.Timeout;

  constructor(private httpClient: HttpClient, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.sharing.subscribe(value => {
      if (value.type === 'error'){
        // this.copyToClipboard();
        this.notificationService.errorLong(JSON.stringify(value.error))
      } else if (value.type === 'thank-you') {
        this.notificationService.success('Multumim!')
      }
    })


  }

  public fileUploaded(event){
    this.uploadError.next('')
    const type = event.target.files[0].type;
    if (type === 'image/jpeg' || type === 'image/png') {
      try {
        this.loading.next(true);
        this.readImageFile(event.target.files[0]);
      } catch (err){
        console.error(err);
        this.loading.next(false);
        this.uploadError.next('Avem o problema! Te rugam sa reincerci')
      }
    } else {
      this.uploadError.next('Fisier nepotrivit. Alege doar imagine JPEG sau PNG');
    }
  }

  private readImageFile(file: File) {
    const max_size = 768;
    const reader = new FileReader();

    reader.onload = (e) => {
      const image = new Image();
      typeof e.target.result === 'string' ? image.src = e.target.result : image.src = '';

      image.onload =  () => {
        let w = image.width;
        let h = image.height;

        if (w > h) {  if (w > max_size) { h *= max_size / w; w = max_size; }
        } else     {  if (h > max_size) { w *= max_size / h; h = max_size; } }

        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        canvas.getContext('2d').drawImage(image, 0, 0, w, h);

        let dataURL;
        if (file.type === 'image/jpeg') {
          dataURL = canvas.toDataURL('image/jpeg', 1.0);
        } else {
          dataURL = canvas.toDataURL('image/png');
        }
        this.uploadData(dataURL);
      }
    };
    reader.readAsDataURL(file);
  }

  private uploadData(dataURL){
    this.httpClient.get<{Key: string, uploadURL: string}>(`${this.apiGateway}/blackboard`)
      .subscribe( res => {
        const parts = dataURL.split(',')
        const binary = atob(parts[1])
        const array = []
        for (let i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i))
        }
        const type = parts[0].split(':')[1].split(';')[0]
        const blobData = new Blob([new Uint8Array(array)], {type})

        this.key = res.Key;

        this.httpClient.put<any>(res.uploadURL, blobData).subscribe(
          success => this.retrieveImage(res.Key),
          err => {
            this.loading.next(false);
            this.uploadError.next('Avem o problema! Te rugam sa reincerci')
          }
        )
      }, err => {
        this.loading.next(false);
        this.uploadError.next('Avem o problema! Te rugam sa reincerci')
      })
  }

  private retrieveImage(key: string){
    this.count = 0;
    this.timer = setInterval( () => {
      this.count += 1
      // if (this.count === 1){
      //   key = '1.jpg';
      // }
      if (this.count >= 100){
        this.failedProcessing.next(true);
        this.noResult.next(false);
        clearInterval(this.timer);
      }
      this.httpClient.head<any>(`https://tableta-inmultirii-public.s3.eu-central-1.amazonaws.com/${key}.jpg`)
        .subscribe(
          () => {
          clearInterval(this.timer);
          // see safe url
          this.imgSrc = `https://tableta-inmultirii-public.s3.eu-central-1.amazonaws.com/${key}.jpg`;
          this.failedProcessing.next(false);
          this.noResult.next(false);
        },
        err => {

        }
      )
    }, 1000);
  }

  public retry(){
    this.loading.next( false);
    this.noResult.next(true);
    this.failedProcessing.next(false);
    this.uploadError.next('');
    this.imgSrc = '';
  }

  public share(){
    this.httpClient.get(this.imgSrc, { responseType: 'blob' }).subscribe(
      blob => {
        const file = new File([blob], 'Tableta Inmultirii.jpg');
        try {
          if (navigator.share) {
            navigator.share({
              title: 'Donează pe Tableta Înmulțirii',
              text: 'Donează pe Tableta Înmulțirii pentru Educație digitală cu șanse egale! Contribuie și tu la răspândirea mesaju cu propria tablă desenată',
              url: 'https://tableta-inmultirii.ro',
              files: [file]
            } as ShareData).then(() => {
              alert('thank-you')
              console.log('Thanks for sharing!');
              this.sharing.next({type: 'thank-you'})
            })
              .catch(err => {
                alert(JSON.stringify(err))
                this.sharing.next({type: 'error', error: err})
              });
          } else {
            alert('not found')
            this.sharing.next({type: 'error', error: 'not found'})
          }
        } catch (err){
          alert(JSON.stringify(err))
        }
      }
    )

  }

  public copyLinkAddress(){
    this.copyToClipboard({what: `https://tableta-inmultirii.ro/share/me.php?c=${this.key}` , description: 'adresa link share'})
  }

  public copyImageLink(){
    this.copyToClipboard({what: `https://tableta-inmultirii-public.s3.eu-central-1.amazonaws.com/${this.key}.jpg` , description: 'adresa poza'})
  }

  public copyText(){
    this.copyToClipboard({
      description: 'text',
      what: 'Donează laptopul, tableta sau telefonul vechi pe Tableta Înmulțirii pentru Educație digitală cu șanse egale! Contribuie și tu la răspândirea mesajului cu propria tablă desenată. \n\nPoți accesa direct www.tableta-inmultirii.ro pentru a ajuta. \n\n#educatiedigitala #ajut #imipasa #tabletainmultirii'
    })
  }

  private copyToClipboard(copyValue){
    const textarea = document.createElement( 'textarea' );
    textarea.style.height = '0px';
    textarea.style.left = '-100px';
    textarea.style.opacity = '0';
    textarea.style.position = 'fixed';
    textarea.style.top = '-100px';
    textarea.style.width = '0px';
    document.body.appendChild( textarea );

    // Set and select the value (creating an active Selection range).
    textarea.value = copyValue.what;
    textarea.select();
    textarea.setSelectionRange(0, 99999);

    /* Copy the text inside the text field */
    document.execCommand('copy');
    this.notificationService.success(`Am copiat ${copyValue.description}`)
  }

}
