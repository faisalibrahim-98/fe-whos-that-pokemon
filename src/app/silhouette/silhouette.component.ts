import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PokemonService } from '@/services/pokemon.service';
import { Result } from '@/interfaces';
import { Subscription } from 'rxjs';
import {
  transition,
  trigger,
  animate,
  state,
  style,
} from '@angular/animations';

@Component({
  selector: 'app-silhouette',
  templateUrl: './silhouette.component.html',
  styleUrl: './silhouette.component.css',
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition('void <=> *', [animate('0.5s ease-in-out')]),
    ]),
  ],
})
export class SilhouetteComponent implements OnInit, OnDestroy {
  @Input() silhouetteUrl: string = '';

  resultSubscription: Subscription | undefined;
  showOverlay: boolean = true;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.subscribeResult();
  }

  subscribeResult(): void {
    this.resultSubscription = this.pokemonService.result$.subscribe(
      (result: Result | undefined) => {
        this.showOverlay = !result ? true : false;
      },
    );
  }

  ngOnDestroy(): void {
    this.resultSubscription?.unsubscribe();
  }
}
