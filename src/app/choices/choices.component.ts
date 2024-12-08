import { Result } from '@/interfaces';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-choices',
  templateUrl: './choices.component.html',
  styleUrl: './choices.component.css',
})
export class ChoicesComponent {
  @Input() options: string[] = [];
  @Input() result: Result | undefined;

  @Output() onSelect = new EventEmitter<string>();

  selection: string | undefined;

  constructor() {}

  selectAnswer(option: string): void {
    this.selection = option;
    this.onSelect.emit(option);
  }

  correctAnswer(option: string): boolean {
    return this.result && option === this.result.name ? true : false;
  }

  wrongAnswer(option: string): boolean {
    return this.result &&
      option !== this.result.name &&
      option === this.selection
      ? true
      : false;
  }

  resultExist(): boolean {
    return this.result ? true : false;
  }
}
