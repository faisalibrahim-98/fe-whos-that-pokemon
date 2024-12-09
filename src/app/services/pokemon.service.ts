import { Pokemon, Result, VerifyBody } from '@/interfaces';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl = 'http://localhost:3000';

  public pokemon$ = new Subject<Pokemon>();
  public result$ = new Subject<Result | undefined>();

  constructor(private http: HttpClient) {}

  async getRandomPokemon(): Promise<void> {
    const pokemonData: Pokemon = await lastValueFrom(
      this.http.get<Pokemon>(`${this.baseUrl}/random`),
    );

    this.updatePokemon(pokemonData);
  }

  updatePokemon(pokemonData: Pokemon): void {
    this.pokemon$.next(pokemonData);
  }

  async verifyAnswer(body: VerifyBody): Promise<void> {
    const result: Result = await lastValueFrom(
      this.http.post<Result>(`${this.baseUrl}/verify`, body),
    );

    this.updateResult(result);
  }

  updateResult(result: Result): void {
    this.result$.next(result);
  }

  clearResult(): void {
    this.result$.next(undefined);
  }
}
