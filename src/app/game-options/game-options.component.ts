import { Component, EventEmitter, Output } from '@angular/core';
import { PokemonService } from '@/services/pokemon.service';
import { Result } from '@/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game-options',
  templateUrl: './game-options.component.html',
  styleUrl: './game-options.component.css',
})
export class GameOptionsComponent {
  @Output() next = new EventEmitter<void>();

  resultSubscription: Subscription | undefined;
  resultExists: boolean = false;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.subscribeResult();
  }

  subscribeResult(): void {
    this.resultSubscription = this.pokemonService.result$.subscribe(
      (result: Result | undefined) => {
        this.resultExists = !!result;
      },
    );
  }

  onClickNext(): void {
    this.next.emit();
  }

  btnClasses(): Record<string, boolean> {
    return {
      'bg-gray-200': !this.resultExists,
      'text-gray-600': !this.resultExists,
      'opacity-50': !this.resultExists,
      'hover:bg-amber-400': this.resultExists,
    };
  }

  ngOnDestroy(): void {
    this.resultSubscription?.unsubscribe();
  }
}
