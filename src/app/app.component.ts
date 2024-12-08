import { PokemonService } from '@/services/pokemon.service';
import { Pokemon, Result, VerifyBody } from '@/interfaces';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  pokemon: Pokemon | undefined;
  result: Result | undefined;

  constructor(
    private pokemonService: PokemonService,
    private spinner: NgxSpinnerService,
  ) {}

  ngOnInit(): void {
    this.getPokemon();
  }

  async getPokemon(): Promise<void> {
    try {
      this.spinner.show();
      this.pokemon = await this.pokemonService.getRandomPokemon();
      this.result = undefined;
    } finally {
      this.spinner.hide();
    }
  }

  async getReult(choice: string): Promise<void> {
    if (!this.pokemon) return;

    try {
      this.spinner.show();
      const body: VerifyBody = {
        id: this.pokemon.id,
        choice,
      };
      this.result = await this.pokemonService.verifyAnswer(body);
    } finally {
      this.spinner.hide();
    }
  }

  onClickOption(option: string): void {
    this.getReult(option);
  }

  onClickNext(): void {
    this.getPokemon();
  }
}
