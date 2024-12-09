import { Component, OnDestroy, OnInit } from '@angular/core';
import { PokemonService } from '@/services/pokemon.service';
import { Pokemon, VerifyBody } from '@/interfaces';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  pokemonSubscription: Subscription | undefined;
  pokemon: Pokemon | undefined;

  constructor(
    private pokemonService: PokemonService,
    private spinnerService: NgxSpinnerService,
  ) {}

  ngOnInit(): void {
    this.subscribePokemon();
    this.getPokemon();
  }

  subscribePokemon(): void {
    this.pokemonSubscription = this.pokemonService.pokemon$.subscribe(
      (pokemon: Pokemon | undefined) => {
        this.pokemon = pokemon;
      },
    );
  }

  async getPokemon(): Promise<void> {
    try {
      this.spinnerService.show();
      await this.pokemonService.getRandomPokemon();
      this.pokemonService.clearResult();
    } finally {
      this.spinnerService.hide();
    }
  }

  async getResult(choice: string): Promise<void> {
    if (!this.pokemon) return;

    try {
      this.spinnerService.show();
      const body: VerifyBody = {
        id: this.pokemon.id,
        choice,
      };

      await this.pokemonService.verifyAnswer(body);
    } finally {
      this.spinnerService.hide();
    }
  }

  onClickOption(option: string): void {
    this.getResult(option);
  }

  onClickNext(): void {
    this.getPokemon();
  }

  ngOnDestroy(): void {
    this.pokemonSubscription?.unsubscribe();
  }
}
