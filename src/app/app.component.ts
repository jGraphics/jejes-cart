import { Component } from '@angular/core';
import { addIcons } from 'ionicons';
import { register } from 'swiper/element/bundle';
import {library, playCircle, radio, search} from 'ionicons/icons';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {

    addIcons({ library, playCircle, radio, search});
  }
}
