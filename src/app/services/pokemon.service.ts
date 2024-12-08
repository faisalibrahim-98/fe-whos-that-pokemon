import { Pokemon, Result, VerifyBody } from '@/interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  async getRandomPokemon(): Promise<Pokemon> {
    return await lastValueFrom(
      this.http.get<Pokemon>(`${this.baseUrl}/random`),
    );
  }

  async verifyAnswer(body: VerifyBody): Promise<Result> {
    return await lastValueFrom(
      this.http.post<Result>(`${this.baseUrl}/verify`, body),
    );
  }
}
