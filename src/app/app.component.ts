import {Component, ViewEncapsulation} from '@angular/core';
import {NavbarService} from './services/navbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    NavbarService
  ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'subscription-web-app';
  isClosed = false;

  toggleSidebar(): void {
    this.isClosed = !this.isClosed;
  }
}
