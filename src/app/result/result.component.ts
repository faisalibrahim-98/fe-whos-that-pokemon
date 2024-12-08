import { Component, Input, OnChanges } from '@angular/core';
import { Result } from '@/interfaces';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrl: './result.component.css',
})
export class ResultComponent implements OnChanges {
  @Input() result: Result | undefined;

  message: string = '';

  constructor() {}

  ngOnChanges(): void {
    if (this.result?.correct) {
      this.message = `Nice Gary! This is ${this.result.name}!`;
    } else if (this.result?.correct === false) {
      this.message = `Nah Man! Give it Another Shot!`;
    } else {
      this.message = '';
    }
  }
}
