import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-card-input',
  templateUrl: './card-input.component.html',
  styleUrls: ['./card-input.component.css']
})
export class CardInputComponent implements OnInit {

  token;

  iframeStyling = 'https://fts-uat.cardconnect.com/itoke/ajax-tokenizer.html?css='
    + '%2Eerror%7Bcolor%3A+red%3B%7Dinput%7Bwidth%3Acalc%28100%25-2px%29%3Bheight%3A24px%3Bpadding-top%3A6px%3Bpadding-bottom%3A6px%3Bborder%3A1px+solid+%23ced4da%3B%7Dbody%7Bmargin%3A0%3B%7D';

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('window:message', ['$event'])
  onMessage(event) {
    if (event && event.data) {
      try {
        const tokenMessage = JSON.parse(event.data);
        if (tokenMessage && tokenMessage.message) {
          this.token = tokenMessage.message;
          console.log(this.token);
        }
      } catch (e) {
      }
    }
  }

  printToken(event): void {
    console.log('Printing token');
    console.log(event);
  }

}
