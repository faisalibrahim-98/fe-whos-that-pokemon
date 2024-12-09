import { PokemonService } from '@/services/pokemon.service';
import { Component, OnInit } from '@angular/core';
import { Result } from '@/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrl: './result.component.css',
})
export class ResultComponent implements OnInit {
  resultSubscription: Subscription | undefined;
  success: boolean = false;
  message: string = '';

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.subscribeResult();
  }

  subscribeResult(): void {
    this.resultSubscription = this.pokemonService.result$.subscribe(
      (result: Result | undefined) => {
        if (result?.correct) {
          this.message = `Nice Gary! This is ${result.name}!`;
          this.success = true;
        } else if (result?.correct === false) {
          this.message = `Nah Man! Give it Another Shot!`;
          this.success = false;
        } else {
          this.message = '';
        }
      },
    );
  }
}
