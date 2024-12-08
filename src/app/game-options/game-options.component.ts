import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Result } from '@/interfaces';

@Component({
  selector: 'app-game-options',
  templateUrl: './game-options.component.html',
  styleUrl: './game-options.component.css',
})
export class GameOptionsComponent {
  @Input() result: Result | undefined;

  @Output() next = new EventEmitter<void>();

  constructor() {}

  onClickNext(): void {
    this.next.emit();
  }
}
